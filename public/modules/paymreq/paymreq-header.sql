-- paymreq.sql


/* =============================================
 * CREATE TABLE act."paymreq"
 * ============================================*/
create table act."paymreq" (
	paymreq_id bigint not null,
	constraint paymreq_pk primary key (paymreq_id)
);
comment on table act."paymreq" is '';	


-- =============================================
-- FIELD: paymreq_doc text
-- =============================================
-- ADD paymreq_doc
alter table act."paymreq" add paymreq_doc text  ;
comment on column act."paymreq".paymreq_doc is '';

-- MODIFY paymreq_doc
alter table act."paymreq"
	alter column paymreq_doc type text,
	ALTER COLUMN paymreq_doc DROP DEFAULT,
	ALTER COLUMN paymreq_doc DROP NOT NULL;
comment on column act."paymreq".paymreq_doc is '';


-- =============================================
-- FIELD: paymreq_date date
-- =============================================
-- ADD paymreq_date
alter table act."paymreq" add paymreq_date date  default now();
comment on column act."paymreq".paymreq_date is '';

-- MODIFY paymreq_date
alter table act."paymreq"
	alter column paymreq_date type date,
	ALTER COLUMN paymreq_date SET DEFAULT now(),
	ALTER COLUMN paymreq_date DROP NOT NULL;
comment on column act."paymreq".paymreq_date is '';


-- =============================================
-- FIELD: paymreq_datedue date
-- =============================================
-- ADD paymreq_datedue
alter table act."paymreq" add paymreq_datedue date  default now();
comment on column act."paymreq".paymreq_datedue is '';

-- MODIFY paymreq_datedue
alter table act."paymreq"
	alter column paymreq_datedue type date,
	ALTER COLUMN paymreq_datedue SET DEFAULT now(),
	ALTER COLUMN paymreq_datedue DROP NOT NULL;
comment on column act."paymreq".paymreq_datedue is '';


-- =============================================
-- FIELD: paymreq_descr text
-- =============================================
-- ADD paymreq_descr
alter table act."paymreq" add paymreq_descr text  ;
comment on column act."paymreq".paymreq_descr is '';

-- MODIFY paymreq_descr
alter table act."paymreq"
	alter column paymreq_descr type text,
	ALTER COLUMN paymreq_descr DROP DEFAULT,
	ALTER COLUMN paymreq_descr DROP NOT NULL;
comment on column act."paymreq".paymreq_descr is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."paymreq" add _createby integer not null ;
comment on column act."paymreq"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."paymreq"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."paymreq"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."paymreq" add _createdate timestamp with time zone not null default now();
comment on column act."paymreq"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."paymreq"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."paymreq"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."paymreq" add _modifyby integer  ;
comment on column act."paymreq"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."paymreq"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."paymreq"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."paymreq" add _modifydate timestamp with time zone  ;
comment on column act."paymreq"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."paymreq"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."paymreq"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Add Foreign Key Constraint  	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table act."paymreq"
	drop constraint uq$act$paymreq$paymreq_doc;
	

-- Add unique index 
alter table  act."paymreq"
	add constraint uq$act$paymreq$paymreq_doc unique (paymreq_doc); 

