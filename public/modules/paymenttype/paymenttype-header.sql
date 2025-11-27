-- paymenttype.sql


/* =============================================
 * CREATE TABLE act."paymenttype"
 * ============================================*/
create table act."paymenttype" (
	paymenttype_id smallint not null,
	constraint paymenttype_pk primary key (paymenttype_id)
);
comment on table act."paymenttype" is '';	


-- =============================================
-- FIELD: paymenttype_name text
-- =============================================
-- ADD paymenttype_name
alter table act."paymenttype" add paymenttype_name text  ;
comment on column act."paymenttype".paymenttype_name is '';

-- MODIFY paymenttype_name
alter table act."paymenttype"
	alter column paymenttype_name type text,
	ALTER COLUMN paymenttype_name DROP DEFAULT,
	ALTER COLUMN paymenttype_name DROP NOT NULL;
comment on column act."paymenttype".paymenttype_name is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."paymenttype" add _createby integer not null ;
comment on column act."paymenttype"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."paymenttype"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."paymenttype"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."paymenttype" add _createdate timestamp with time zone not null default now();
comment on column act."paymenttype"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."paymenttype"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."paymenttype"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."paymenttype" add _modifyby integer  ;
comment on column act."paymenttype"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."paymenttype"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."paymenttype"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."paymenttype" add _modifydate timestamp with time zone  ;
comment on column act."paymenttype"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."paymenttype"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."paymenttype"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Add Foreign Key Constraint  	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Add unique index 
alter table  act."paymenttype"
	add constraint uq$act$paymenttype$paymenttype_name unique (paymenttype_name); 

