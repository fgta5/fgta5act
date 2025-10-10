-- coacategory.sql


/* =============================================
 * CREATE TABLE dev."coacategory"
 * ============================================*/
create table dev."coacategory" (
	coacategory_id smallint not null,
	constraint coacategory_pk primary key (coacategory_id)
);
comment on table dev."coacategory" is '';	


-- =============================================
-- FIELD: coacategory_name text
-- =============================================
-- ADD coacategory_name
alter table dev."coacategory" add coacategory_name text  ;
comment on column dev."coacategory".coacategory_name is '';

-- MODIFY coacategory_name
alter table dev."coacategory"
	alter column coacategory_name type text,
	ALTER COLUMN coacategory_name DROP DEFAULT,
	ALTER COLUMN coacategory_name DROP NOT NULL;
comment on column dev."coacategory".coacategory_name is '';


-- =============================================
-- FIELD: coacategory_descr text
-- =============================================
-- ADD coacategory_descr
alter table dev."coacategory" add coacategory_descr text  ;
comment on column dev."coacategory".coacategory_descr is '';

-- MODIFY coacategory_descr
alter table dev."coacategory"
	alter column coacategory_descr type text,
	ALTER COLUMN coacategory_descr DROP DEFAULT,
	ALTER COLUMN coacategory_descr DROP NOT NULL;
comment on column dev."coacategory".coacategory_descr is '';


-- =============================================
-- FIELD: _createby bigint
-- =============================================
-- ADD _createby
alter table dev."coacategory" add _createby bigint not null ;
comment on column dev."coacategory"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table dev."coacategory"
	alter column _createby type bigint,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column dev."coacategory"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table dev."coacategory" add _createdate timestamp with time zone not null ;
comment on column dev."coacategory"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table dev."coacategory"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate DROP DEFAULT,
	ALTER COLUMN _createdate SET NOT NULL;
comment on column dev."coacategory"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby bigint
-- =============================================
-- ADD _modifyby
alter table dev."coacategory" add _modifyby bigint  ;
comment on column dev."coacategory"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table dev."coacategory"
	alter column _modifyby type bigint,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column dev."coacategory"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table dev."coacategory" add _modifydate timestamp with time zone  ;
comment on column dev."coacategory"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table dev."coacategory"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column dev."coacategory"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Add Foreign Key Constraint  	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table dev."coacategory"
	drop constraint uq$dev$coacategory$coacategory_name;
	

-- Add unique index 
alter table  dev."coacategory"
	add constraint uq$dev$coacategory$coacategory_name unique (coacategory_name); 

