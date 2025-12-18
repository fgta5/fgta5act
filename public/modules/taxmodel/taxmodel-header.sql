-- taxmodel.sql


/* =============================================
 * CREATE TABLE act."taxmodel"
 * ============================================*/
create table act."taxmodel" (
	taxmodel_id smallint not null,
	constraint taxmodel_pk primary key (taxmodel_id)
);
comment on table act."taxmodel" is '';	


-- =============================================
-- FIELD: taxmodel_name text
-- =============================================
-- ADD taxmodel_name
alter table act."taxmodel" add taxmodel_name text  ;
comment on column act."taxmodel".taxmodel_name is '';

-- MODIFY taxmodel_name
alter table act."taxmodel"
	alter column taxmodel_name type text,
	ALTER COLUMN taxmodel_name DROP DEFAULT,
	ALTER COLUMN taxmodel_name DROP NOT NULL;
comment on column act."taxmodel".taxmodel_name is '';


-- =============================================
-- FIELD: taxmodel_formula text
-- =============================================
-- ADD taxmodel_formula
alter table act."taxmodel" add taxmodel_formula text  ;
comment on column act."taxmodel".taxmodel_formula is '';

-- MODIFY taxmodel_formula
alter table act."taxmodel"
	alter column taxmodel_formula type text,
	ALTER COLUMN taxmodel_formula DROP DEFAULT,
	ALTER COLUMN taxmodel_formula DROP NOT NULL;
comment on column act."taxmodel".taxmodel_formula is '';


-- =============================================
-- FIELD: taxmodel_value decimal(5, 2)
-- =============================================
-- ADD taxmodel_value
alter table act."taxmodel" add taxmodel_value decimal(5, 2) not null default 0;
comment on column act."taxmodel".taxmodel_value is '';

-- MODIFY taxmodel_value
alter table act."taxmodel"
	alter column taxmodel_value type decimal(5, 2),
	ALTER COLUMN taxmodel_value SET DEFAULT 0,
	ALTER COLUMN taxmodel_value SET NOT NULL;
comment on column act."taxmodel".taxmodel_value is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."taxmodel" add _createby integer not null ;
comment on column act."taxmodel"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."taxmodel"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."taxmodel"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."taxmodel" add _createdate timestamp with time zone not null default now();
comment on column act."taxmodel"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."taxmodel"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."taxmodel"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."taxmodel" add _modifyby integer  ;
comment on column act."taxmodel"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."taxmodel"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."taxmodel"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."taxmodel" add _modifydate timestamp with time zone  ;
comment on column act."taxmodel"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."taxmodel"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."taxmodel"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Add Foreign Key Constraint  	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Add unique index 
alter table  act."taxmodel"
	add constraint uq$act$taxmodel$taxmodel_name unique (taxmodel_name); 

