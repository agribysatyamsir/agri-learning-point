-- ============================================================================
-- Learning Point — Turso libSQL Edge Database Schema
-- Optimized for high-throughput attempt tracking, response flushes & AI jobs
-- ============================================================================

pragma foreign_keys = on;

-- 1. Questions Master Table
create table if not exists questions (
  id                  text primary key,
  external_ref        text unique,
  subject             text,
  topic               text,
  subtopic            text,
  question_type       text not null default 'single_choice' check (question_type in ('single_choice','multi_choice','true_false','match','sequence','assertion_reason')),
  question_text_en    text not null,
  question_text_hi    text,
  has_image           integer default 0,
  image_url           text,
  image_alt_en        text,
  image_alt_hi        text,
  difficulty          text default 'medium' check (difficulty in ('easy','medium','hard')),
  source_type         text not null default 'ai_generated' check (source_type in ('master_bank','ai_generated')),
  marks_correct       real not null default 1,
  marks_wrong         real not null default 0.25,
  status              text not null default 'draft' check (status in ('draft','validating','review_required','approved','published','rejected','archived')),
  approved_by         text,
  approved_at         text,
  created_at          text not null default (datetime('now')),
  updated_at          text not null default (datetime('now'))
);

create index if not exists idx_q_subject on questions(subject);
create index if not exists idx_q_topic   on questions(topic);
create index if not exists idx_q_status  on questions(status);
create index if not exists idx_q_source  on questions(source_type);

-- 2. Question Options
create table if not exists options (
  id              text primary key,
  question_id     text not null references questions(id) on delete cascade,
  option_text_en  text not null,
  option_text_hi  text,
  sort_order      integer not null default 0,
  is_correct      integer not null default 0,
  created_at      text not null default (datetime('now'))
);

create index if not exists idx_options_question on options(question_id);

-- 3. Detailed Explanations
create table if not exists explanations (
  id                  text primary key,
  question_id         text not null references questions(id) on delete cascade,
  version             integer not null default 1,
  content_en          text not null,
  content_hi          text,
  explanation_type    text check (explanation_type in ('quant','factual','reasoning','grammar','code','diagram')),
  is_approved         integer not null default 0,
  approved_by         text,
  approved_at         text,
  created_at          text not null default (datetime('now')),
  unique(question_id, version)
);

create index if not exists idx_expl_question on explanations(question_id);

-- 4. Question Sources & Origin Tracking
create table if not exists question_sources (
  id                  text primary key,
  question_id         text not null references questions(id) on delete cascade,
  source_sheet_id     text not null,
  source_tab          text,
  source_row          integer,
  original_hash       text not null,
  normalized_hash     text,
  imported_at         text not null default (datetime('now')),
  last_synced_at      text
);

create index if not exists idx_sources_sheet on question_sources(source_sheet_id, source_tab);
create index if not exists idx_sources_hash  on question_sources(original_hash);

-- 5. Question Embeddings (Semantic Search & Deduplication)
create table if not exists question_embeddings (
  id              text primary key,
  question_id     text not null references questions(id) on delete cascade,
  embedding       text not null,
  model           text not null default 'bge-m3',
  created_at      text not null default (datetime('now'))
);

create index if not exists idx_embed_question on question_embeddings(question_id);

-- 6. Paper Blueprints
create table if not exists paper_blueprints (
  id                  text primary key,
  test_id             text,
  subject_type        text not null check (subject_type in ('agriculture','non_agriculture','mixed')),
  master_bank_pct     integer default 40,
  ai_generated_pct    integer default 60,
  total_questions     integer not null,
  blueprint_json      text not null,
  status              text not null default 'draft' check (status in ('draft','approved','generating','completed','failed')),
  approved_by         text,
  approved_at         text,
  created_at          text not null default (datetime('now'))
);

create index if not exists idx_blueprint_test on paper_blueprints(test_id);

-- 7. AI Background Jobs
create table if not exists ai_jobs (
  id                  text primary key,
  job_type            text not null check (job_type in ('blueprint','generation','validation','distractor','explanation','translation','dedup','audit','import')),
  blueprint_id        text references paper_blueprints(id) on delete set null,
  primary_model       text,
  fallback_chain      text,
  prompt_version      text,
  status              text not null default 'queued' check (status in ('queued','running','paused','completed','failed')),
  paused_reason       text,
  resume_after        text,
  checkpoint_data     text,
  tokens_used         integer default 0,
  requests_used       integer default 0,
  error_message       text,
  output_quality_score real,
  created_at          text not null default (datetime('now')),
  updated_at          text not null default (datetime('now')),
  completed_at        text
);

create index if not exists idx_jobs_status on ai_jobs(status);
create index if not exists idx_jobs_type   on ai_jobs(job_type);

-- 8. Examination Attempts
create table if not exists attempts (
  id                  text primary key,
  profile_id          text not null,
  test_id             text not null,
  attempt_number      integer not null default 1,
  status              text not null default 'in_progress' check (status in ('in_progress','submitted','abandoned','expired')),
  score               real,
  correct_count       integer default 0,
  incorrect_count     integer default 0,
  unattempted_count   integer default 0,
  positive_marks      real default 0,
  negative_marks      real default 0,
  accuracy            real,
  time_taken_seconds  integer,
  shuffle_seed        integer,
  rank                integer,
  percentile          real,
  is_ranked_attempt   integer default 0,
  started_at          text not null default (datetime('now')),
  expires_at          text,
  submitted_at        text,
  last_synced_at      text
);

create index if not exists idx_attempts_profile on attempts(profile_id);
create index if not exists idx_attempts_test    on attempts(test_id, status);
create index if not exists idx_attempts_rank    on attempts(test_id, is_ranked_attempt, score desc);

-- 9. Question Responses per Attempt
create table if not exists responses (
  id                  text primary key,
  attempt_id          text not null references attempts(id) on delete cascade,
  question_id         text not null,
  selected_option_ids text,
  time_spent_seconds  integer default 0,
  is_correct          integer,
  marks_awarded       real,
  is_marked_for_review integer default 0,
  answered_at         text,
  created_at          text not null default (datetime('now')),
  updated_at          text not null default (datetime('now')),
  unique(attempt_id, question_id)
);

create index if not exists idx_responses_attempt on responses(attempt_id);

-- 10. Audit Attempt Events (Connection state, Syncs, Disconnects)
create table if not exists attempt_events (
  id              text primary key,
  attempt_id      text not null references attempts(id) on delete cascade,
  event_type      text not null check (event_type in ('start','answer_save','answer_sync','page_refresh','network_disconnect','network_reconnect','submit','resume')),
  event_data      text,
  created_at      text not null default (datetime('now'))
);

create index if not exists idx_events_attempt on attempt_events(attempt_id);

-- 11. Question Usage & Reporting Analytics
create table if not exists question_usage (
  question_id     text primary key references questions(id) on delete cascade,
  times_used      integer not null default 0,
  last_used_at    text,
  times_reported  integer not null default 0
);

-- 12. Leaderboard & Rankings Snapshots
create table if not exists rankings (
  id              text primary key,
  test_id         text not null,
  attempt_id      text not null,
  profile_id      text not null,
  score           real not null,
  accuracy        real,
  rank            integer,
  is_final        integer default 0,
  computed_at     text not null default (datetime('now'))
);

create index if not exists idx_rank_test_score on rankings(test_id, score desc);
create index if not exists idx_rank_profile    on rankings(profile_id);
