-- agingtype.sql


/* =============================================
 * CREATE TABLE act."agingtype"
 * ============================================*/
create table act."agingtype" (
	agingtype_id smallint not null,
	constraint agingtype_pk primary key (agingtype_id)
);
comment on table act."agingtype" is '';	


-- =============================================
-- FIELD: agingtype_name char(2)
-- =============================================
-- ADD agingtype_name
alter table act."agingtype" add agingtype_name char(2)  ;
comment on column act."agingtype".agingtype_name is '';

-- MODIFY agingtype_name
alter table act."agingtype"
	alter column agingtype_name type char(2),
	ALTER COLUMN agingtype_name DROP DEFAULT,
	ALTER COLUMN agingtype_name DROP NOT NULL;
comment on column act."agingtype".agingtype_name is '';


-- =============================================
-- FIELD: agingtype_descr text
-- =============================================
-- ADD agingtype_descr
alter table act."agingtype" add agingtype_descr text  ;
comment on column act."agingtype".agingtype_descr is '';

-- MODIFY agingtype_descr
alter table act."agingtype"
	alter column agingtype_descr type text,
	ALTER COLUMN agingtype_descr DROP DEFAULT,
	ALTER COLUMN agingtype_descr DROP NOT NULL;
comment on column act."agingtype".agingtype_descr is '';


-- =============================================
-- FIELD: _createby bigint
-- =============================================
-- ADD _createby
alter table act."agingtype" add _createby bigint not null ;
comment on column act."agingtype"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."agingtype"
	alter column _createby type bigint,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."agingtype"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."agingtype" add _createdate timestamp with time zone not null ;
comment on column act."agingtype"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."agingtype"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate DROP DEFAULT,
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."agingtype"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby bigint
-- =============================================
-- ADD _modifyby
alter table act."agingtype" add _modifyby bigint  ;
comment on column act."agingtype"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."agingtype"
	alter column _modifyby type bigint,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."agingtype"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."agingtype" add _modifydate timestamp with time zone  ;
comment on column act."agingtype"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."agingtype"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."agingtype"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Add Foreign Key Constraint  	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table act."agingtype"
	drop constraint uq$act$agingtype$agingtype_name;
	

-- Add unique index 
alter table  act."agingtype"
	add constraint uq$act$agingtype$agingtype_name unique (agingtype_name); 

