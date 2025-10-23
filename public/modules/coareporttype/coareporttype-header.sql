-- coareporttype.sql


/* =============================================
 * CREATE TABLE act."coareporttype"
 * ============================================*/
create table act."coareporttype" (
	coareporttype_id smallint not null,
	constraint coareporttype_pk primary key (coareporttype_id)
);
comment on table act."coareporttype" is '';	


-- =============================================
-- FIELD: coareporttype_name text
-- =============================================
-- ADD coareporttype_name
alter table act."coareporttype" add coareporttype_name text  ;
comment on column act."coareporttype".coareporttype_name is '';

-- MODIFY coareporttype_name
alter table act."coareporttype"
	alter column coareporttype_name type text,
	ALTER COLUMN coareporttype_name DROP DEFAULT,
	ALTER COLUMN coareporttype_name DROP NOT NULL;
comment on column act."coareporttype".coareporttype_name is '';


-- =============================================
-- FIELD: coareporttype_descr text
-- =============================================
-- ADD coareporttype_descr
alter table act."coareporttype" add coareporttype_descr text  ;
comment on column act."coareporttype".coareporttype_descr is '';

-- MODIFY coareporttype_descr
alter table act."coareporttype"
	alter column coareporttype_descr type text,
	ALTER COLUMN coareporttype_descr DROP DEFAULT,
	ALTER COLUMN coareporttype_descr DROP NOT NULL;
comment on column act."coareporttype".coareporttype_descr is '';


-- =============================================
-- FIELD: _createby bigint
-- =============================================
-- ADD _createby
alter table act."coareporttype" add _createby bigint not null ;
comment on column act."coareporttype"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."coareporttype"
	alter column _createby type bigint,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."coareporttype"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."coareporttype" add _createdate timestamp with time zone not null ;
comment on column act."coareporttype"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."coareporttype"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate DROP DEFAULT,
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."coareporttype"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby bigint
-- =============================================
-- ADD _modifyby
alter table act."coareporttype" add _modifyby bigint  ;
comment on column act."coareporttype"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."coareporttype"
	alter column _modifyby type bigint,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."coareporttype"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."coareporttype" add _modifydate timestamp with time zone  ;
comment on column act."coareporttype"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."coareporttype"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."coareporttype"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Add Foreign Key Constraint  	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table act."coareporttype"
	drop constraint uq$act$coareporttype$coareporttype_name;
	

-- Add unique index 
alter table  act."coareporttype"
	add constraint uq$act$coareporttype$coareporttype_name unique (coareporttype_name); 

