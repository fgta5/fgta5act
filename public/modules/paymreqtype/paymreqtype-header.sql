-- paymreqtype.sql


/* =============================================
 * CREATE TABLE act."paymreqtype"
 * ============================================*/
create table act."paymreqtype" (
	paymreqtype_id smallint not null,
	constraint paymreqtype_pk primary key (paymreqtype_id)
);
comment on table act."paymreqtype" is '';	


-- =============================================
-- FIELD: paymreqtype_name text
-- =============================================
-- ADD paymreqtype_name
alter table act."paymreqtype" add paymreqtype_name text  ;
comment on column act."paymreqtype".paymreqtype_name is '';

-- MODIFY paymreqtype_name
alter table act."paymreqtype"
	alter column paymreqtype_name type text,
	ALTER COLUMN paymreqtype_name DROP DEFAULT,
	ALTER COLUMN paymreqtype_name DROP NOT NULL;
comment on column act."paymreqtype".paymreqtype_name is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."paymreqtype" add _createby integer not null ;
comment on column act."paymreqtype"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."paymreqtype"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."paymreqtype"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."paymreqtype" add _createdate timestamp with time zone not null default now();
comment on column act."paymreqtype"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."paymreqtype"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."paymreqtype"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."paymreqtype" add _modifyby integer  ;
comment on column act."paymreqtype"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."paymreqtype"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."paymreqtype"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."paymreqtype" add _modifydate timestamp with time zone  ;
comment on column act."paymreqtype"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."paymreqtype"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."paymreqtype"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Add Foreign Key Constraint  	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Add unique index 
alter table  act."paymreqtype"
	add constraint uq$act$paymreqtype$paymreqtype_name unique (paymreqtype_name); 

