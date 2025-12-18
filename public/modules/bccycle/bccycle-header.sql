-- bccycle.sql


/* =============================================
 * CREATE TABLE act."bccycle"
 * ============================================*/
create table act."bccycle" (
	bccycle_id smallint not null,
	constraint bccycle_pk primary key (bccycle_id)
);
comment on table act."bccycle" is '';	


-- =============================================
-- FIELD: bccycle_name text
-- =============================================
-- ADD bccycle_name
alter table act."bccycle" add bccycle_name text  ;
comment on column act."bccycle".bccycle_name is '';

-- MODIFY bccycle_name
alter table act."bccycle"
	alter column bccycle_name type text,
	ALTER COLUMN bccycle_name DROP DEFAULT,
	ALTER COLUMN bccycle_name DROP NOT NULL;
comment on column act."bccycle".bccycle_name is '';


-- =============================================
-- FIELD: isusecoaclass boolean
-- =============================================
-- ADD isusecoaclass
alter table act."bccycle" add isusecoaclass boolean not null default false;
comment on column act."bccycle".isusecoaclass is '';

-- MODIFY isusecoaclass
alter table act."bccycle"
	alter column isusecoaclass type boolean,
	ALTER COLUMN isusecoaclass SET DEFAULT false,
	ALTER COLUMN isusecoaclass SET NOT NULL;
comment on column act."bccycle".isusecoaclass is '';


-- =============================================
-- FIELD: isusecurr boolean
-- =============================================
-- ADD isusecurr
alter table act."bccycle" add isusecurr boolean not null default false;
comment on column act."bccycle".isusecurr is '';

-- MODIFY isusecurr
alter table act."bccycle"
	alter column isusecurr type boolean,
	ALTER COLUMN isusecurr SET DEFAULT false,
	ALTER COLUMN isusecurr SET NOT NULL;
comment on column act."bccycle".isusecurr is '';


-- =============================================
-- FIELD: isuseapproval boolean
-- =============================================
-- ADD isuseapproval
alter table act."bccycle" add isuseapproval boolean not null default false;
comment on column act."bccycle".isuseapproval is '';

-- MODIFY isuseapproval
alter table act."bccycle"
	alter column isuseapproval type boolean,
	ALTER COLUMN isuseapproval SET DEFAULT false,
	ALTER COLUMN isuseapproval SET NOT NULL;
comment on column act."bccycle".isuseapproval is '';


-- =============================================
-- FIELD: isusepaymreq boolean
-- =============================================
-- ADD isusepaymreq
alter table act."bccycle" add isusepaymreq boolean not null default false;
comment on column act."bccycle".isusepaymreq is '';

-- MODIFY isusepaymreq
alter table act."bccycle"
	alter column isusepaymreq type boolean,
	ALTER COLUMN isusepaymreq SET DEFAULT false,
	ALTER COLUMN isusepaymreq SET NOT NULL;
comment on column act."bccycle".isusepaymreq is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."bccycle" add _createby integer not null ;
comment on column act."bccycle"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."bccycle"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."bccycle"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."bccycle" add _createdate timestamp with time zone not null default now();
comment on column act."bccycle"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."bccycle"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."bccycle"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."bccycle" add _modifyby integer  ;
comment on column act."bccycle"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."bccycle"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."bccycle"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."bccycle" add _modifydate timestamp with time zone  ;
comment on column act."bccycle"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."bccycle"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."bccycle"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Add Foreign Key Constraint  	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table act."bccycle"
	drop constraint uq$act$bccycle$bccycle_name;
	

-- Add unique index 
alter table  act."bccycle"
	add constraint uq$act$bccycle$bccycle_name unique (bccycle_name); 

