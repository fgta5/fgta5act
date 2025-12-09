-- itemmanage.sql


/* =============================================
 * CREATE TABLE act."itemmanage"
 * ============================================*/
create table act."itemmanage" (
	itemmanage_id smallint not null,
	constraint itemmanage_pk primary key (itemmanage_id)
);
comment on table act."itemmanage" is '';	


-- =============================================
-- FIELD: itemmanage_name text
-- =============================================
-- ADD itemmanage_name
alter table act."itemmanage" add itemmanage_name text  ;
comment on column act."itemmanage".itemmanage_name is '';

-- MODIFY itemmanage_name
alter table act."itemmanage"
	alter column itemmanage_name type text,
	ALTER COLUMN itemmanage_name DROP DEFAULT,
	ALTER COLUMN itemmanage_name DROP NOT NULL;
comment on column act."itemmanage".itemmanage_name is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."itemmanage" add _createby integer not null ;
comment on column act."itemmanage"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."itemmanage"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."itemmanage"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."itemmanage" add _createdate timestamp with time zone not null default now();
comment on column act."itemmanage"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."itemmanage"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."itemmanage"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."itemmanage" add _modifyby integer  ;
comment on column act."itemmanage"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."itemmanage"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."itemmanage"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."itemmanage" add _modifydate timestamp with time zone  ;
comment on column act."itemmanage"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."itemmanage"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."itemmanage"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Add Foreign Key Constraint  	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Add unique index 
alter table  act."itemmanage"
	add constraint uq$act$itemmanage$itemmanage_name unique (itemmanage_name); 

