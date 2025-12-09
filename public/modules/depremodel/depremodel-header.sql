-- depremodel.sql


/* =============================================
 * CREATE TABLE act."depremodel"
 * ============================================*/
create table act."depremodel" (
	depremodel_id smallint not null,
	constraint depremodel_pk primary key (depremodel_id)
);
comment on table act."depremodel" is '';	


-- =============================================
-- FIELD: depremodel_name text
-- =============================================
-- ADD depremodel_name
alter table act."depremodel" add depremodel_name text  ;
comment on column act."depremodel".depremodel_name is '';

-- MODIFY depremodel_name
alter table act."depremodel"
	alter column depremodel_name type text,
	ALTER COLUMN depremodel_name DROP DEFAULT,
	ALTER COLUMN depremodel_name DROP NOT NULL;
comment on column act."depremodel".depremodel_name is '';


-- =============================================
-- FIELD: formulaname text
-- =============================================
-- ADD formulaname
alter table act."depremodel" add formulaname text  ;
comment on column act."depremodel".formulaname is '';

-- MODIFY formulaname
alter table act."depremodel"
	alter column formulaname type text,
	ALTER COLUMN formulaname DROP DEFAULT,
	ALTER COLUMN formulaname DROP NOT NULL;
comment on column act."depremodel".formulaname is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."depremodel" add _createby integer not null ;
comment on column act."depremodel"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."depremodel"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."depremodel"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."depremodel" add _createdate timestamp with time zone not null default now();
comment on column act."depremodel"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."depremodel"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."depremodel"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."depremodel" add _modifyby integer  ;
comment on column act."depremodel"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."depremodel"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."depremodel"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."depremodel" add _modifydate timestamp with time zone  ;
comment on column act."depremodel"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."depremodel"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."depremodel"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Add Foreign Key Constraint  	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Add unique index 
alter table  act."depremodel"
	add constraint uq$act$depremodel$depremodel_name unique (depremodel_name); 

