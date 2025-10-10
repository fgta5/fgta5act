-- taxtype.sql


/* =============================================
 * CREATE TABLE act."taxtype"
 * ============================================*/
create table act."taxtype" (
	taxtype_id smallint not null,
	constraint taxtype_pk primary key (taxtype_id)
);
comment on table act."taxtype" is '';	


-- =============================================
-- FIELD: taxtype_name text
-- =============================================
-- ADD taxtype_name
alter table act."taxtype" add taxtype_name text  ;
comment on column act."taxtype".taxtype_name is '';

-- MODIFY taxtype_name
alter table act."taxtype"
	alter column taxtype_name type text,
	ALTER COLUMN taxtype_name DROP DEFAULT,
	ALTER COLUMN taxtype_name DROP NOT NULL;
comment on column act."taxtype".taxtype_name is '';


-- =============================================
-- FIELD: taxtype_descr text
-- =============================================
-- ADD taxtype_descr
alter table act."taxtype" add taxtype_descr text  ;
comment on column act."taxtype".taxtype_descr is '';

-- MODIFY taxtype_descr
alter table act."taxtype"
	alter column taxtype_descr type text,
	ALTER COLUMN taxtype_descr DROP DEFAULT,
	ALTER COLUMN taxtype_descr DROP NOT NULL;
comment on column act."taxtype".taxtype_descr is '';


-- =============================================
-- FIELD: _createby bigint
-- =============================================
-- ADD _createby
alter table act."taxtype" add _createby bigint not null ;
comment on column act."taxtype"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."taxtype"
	alter column _createby type bigint,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."taxtype"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."taxtype" add _createdate timestamp with time zone not null ;
comment on column act."taxtype"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."taxtype"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate DROP DEFAULT,
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."taxtype"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby bigint
-- =============================================
-- ADD _modifyby
alter table act."taxtype" add _modifyby bigint  ;
comment on column act."taxtype"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."taxtype"
	alter column _modifyby type bigint,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."taxtype"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."taxtype" add _modifydate timestamp with time zone  ;
comment on column act."taxtype"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."taxtype"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."taxtype"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Add Foreign Key Constraint  	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table act."taxtype"
	drop constraint uq$act$taxtype$taxtype_name;
	

-- Add unique index 
alter table  act."taxtype"
	add constraint uq$act$taxtype$taxtype_name unique (taxtype_name); 

