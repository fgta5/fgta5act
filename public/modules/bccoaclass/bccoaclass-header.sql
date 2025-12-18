-- bccoaclass.sql


/* =============================================
 * CREATE TABLE act."bccoaclass"
 * ============================================*/
create table act."bccoaclass" (
	bccoaclass_id smallint not null,
	constraint bccoaclass_pk primary key (bccoaclass_id)
);
comment on table act."bccoaclass" is '';	


-- =============================================
-- FIELD: bccoaclass_name text
-- =============================================
-- ADD bccoaclass_name
alter table act."bccoaclass" add bccoaclass_name text  ;
comment on column act."bccoaclass".bccoaclass_name is '';

-- MODIFY bccoaclass_name
alter table act."bccoaclass"
	alter column bccoaclass_name type text,
	ALTER COLUMN bccoaclass_name DROP DEFAULT,
	ALTER COLUMN bccoaclass_name DROP NOT NULL;
comment on column act."bccoaclass".bccoaclass_name is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."bccoaclass" add _createby integer not null ;
comment on column act."bccoaclass"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."bccoaclass"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."bccoaclass"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."bccoaclass" add _createdate timestamp with time zone not null default now();
comment on column act."bccoaclass"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."bccoaclass"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."bccoaclass"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."bccoaclass" add _modifyby integer  ;
comment on column act."bccoaclass"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."bccoaclass"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."bccoaclass"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."bccoaclass" add _modifydate timestamp with time zone  ;
comment on column act."bccoaclass"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."bccoaclass"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."bccoaclass"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Add Foreign Key Constraint  	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table act."bccoaclass"
	drop constraint uq$act$bccoaclass$bccoaclass_name;
	

-- Add unique index 
alter table  act."bccoaclass"
	add constraint uq$act$bccoaclass$bccoaclass_name unique (bccoaclass_name); 

