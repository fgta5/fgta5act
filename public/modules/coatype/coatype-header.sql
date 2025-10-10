-- coatype.sql


/* =============================================
 * CREATE TABLE dev."coatype"
 * ============================================*/
create table dev."coatype" (
	coatype_id smallint not null,
	constraint coatype_pk primary key (coatype_id)
);
comment on table dev."coatype" is '';	


-- =============================================
-- FIELD: coatype_name text
-- =============================================
-- ADD coatype_name
alter table dev."coatype" add coatype_name text  ;
comment on column dev."coatype".coatype_name is '';

-- MODIFY coatype_name
alter table dev."coatype"
	alter column coatype_name type text,
	ALTER COLUMN coatype_name DROP DEFAULT,
	ALTER COLUMN coatype_name DROP NOT NULL;
comment on column dev."coatype".coatype_name is '';


-- =============================================
-- FIELD: coatype_descr text
-- =============================================
-- ADD coatype_descr
alter table dev."coatype" add coatype_descr text  ;
comment on column dev."coatype".coatype_descr is '';

-- MODIFY coatype_descr
alter table dev."coatype"
	alter column coatype_descr type text,
	ALTER COLUMN coatype_descr DROP DEFAULT,
	ALTER COLUMN coatype_descr DROP NOT NULL;
comment on column dev."coatype".coatype_descr is '';


-- =============================================
-- FIELD: _createby bigint
-- =============================================
-- ADD _createby
alter table dev."coatype" add _createby bigint not null ;
comment on column dev."coatype"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table dev."coatype"
	alter column _createby type bigint,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column dev."coatype"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table dev."coatype" add _createdate timestamp with time zone not null ;
comment on column dev."coatype"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table dev."coatype"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate DROP DEFAULT,
	ALTER COLUMN _createdate SET NOT NULL;
comment on column dev."coatype"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby bigint
-- =============================================
-- ADD _modifyby
alter table dev."coatype" add _modifyby bigint  ;
comment on column dev."coatype"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table dev."coatype"
	alter column _modifyby type bigint,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column dev."coatype"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table dev."coatype" add _modifydate timestamp with time zone  ;
comment on column dev."coatype"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table dev."coatype"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column dev."coatype"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Add Foreign Key Constraint  	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table dev."coatype"
	drop constraint uq$dev$coatype$coatype_name;
	

-- Add unique index 
alter table  dev."coatype"
	add constraint uq$dev$coatype$coatype_name unique (coatype_name); 

