-- itemclasstype.sql


/* =============================================
 * CREATE TABLE act."itemclasstype"
 * ============================================*/
create table act."itemclasstype" (
	itemclasstype_id smallint not null,
	constraint itemclasstype_pk primary key (itemclasstype_id)
);
comment on table act."itemclasstype" is '';	


-- =============================================
-- FIELD: itemclasstype_name text
-- =============================================
-- ADD itemclasstype_name
alter table act."itemclasstype" add itemclasstype_name text  ;
comment on column act."itemclasstype".itemclasstype_name is '';

-- MODIFY itemclasstype_name
alter table act."itemclasstype"
	alter column itemclasstype_name type text,
	ALTER COLUMN itemclasstype_name DROP DEFAULT,
	ALTER COLUMN itemclasstype_name DROP NOT NULL;
comment on column act."itemclasstype".itemclasstype_name is '';


-- =============================================
-- FIELD: itemmanage_id smallint
-- =============================================
-- ADD itemmanage_id
alter table act."itemclasstype" add itemmanage_id smallint  ;
comment on column act."itemclasstype".itemmanage_id is '';

-- MODIFY itemmanage_id
alter table act."itemclasstype"
	alter column itemmanage_id type smallint,
	ALTER COLUMN itemmanage_id DROP DEFAULT,
	ALTER COLUMN itemmanage_id DROP NOT NULL;
comment on column act."itemclasstype".itemmanage_id is '';


-- =============================================
-- FIELD: itemclasstype_descr text
-- =============================================
-- ADD itemclasstype_descr
alter table act."itemclasstype" add itemclasstype_descr text  ;
comment on column act."itemclasstype".itemclasstype_descr is '';

-- MODIFY itemclasstype_descr
alter table act."itemclasstype"
	alter column itemclasstype_descr type text,
	ALTER COLUMN itemclasstype_descr DROP DEFAULT,
	ALTER COLUMN itemclasstype_descr DROP NOT NULL;
comment on column act."itemclasstype".itemclasstype_descr is '';


-- =============================================
-- FIELD: ishasbscoa boolean
-- =============================================
-- ADD ishasbscoa
alter table act."itemclasstype" add ishasbscoa boolean not null default false;
comment on column act."itemclasstype".ishasbscoa is '';

-- MODIFY ishasbscoa
alter table act."itemclasstype"
	alter column ishasbscoa type boolean,
	ALTER COLUMN ishasbscoa SET DEFAULT false,
	ALTER COLUMN ishasbscoa SET NOT NULL;
comment on column act."itemclasstype".ishasbscoa is '';


-- =============================================
-- FIELD: ishasdeprecoa boolean
-- =============================================
-- ADD ishasdeprecoa
alter table act."itemclasstype" add ishasdeprecoa boolean not null default false;
comment on column act."itemclasstype".ishasdeprecoa is '';

-- MODIFY ishasdeprecoa
alter table act."itemclasstype"
	alter column ishasdeprecoa type boolean,
	ALTER COLUMN ishasdeprecoa SET DEFAULT false,
	ALTER COLUMN ishasdeprecoa SET NOT NULL;
comment on column act."itemclasstype".ishasdeprecoa is '';


-- =============================================
-- FIELD: ishasdepremethod boolean
-- =============================================
-- ADD ishasdepremethod
alter table act."itemclasstype" add ishasdepremethod boolean not null default false;
comment on column act."itemclasstype".ishasdepremethod is '';

-- MODIFY ishasdepremethod
alter table act."itemclasstype"
	alter column ishasdepremethod type boolean,
	ALTER COLUMN ishasdepremethod SET DEFAULT false,
	ALTER COLUMN ishasdepremethod SET NOT NULL;
comment on column act."itemclasstype".ishasdepremethod is '';


-- =============================================
-- FIELD: ishasdeprecond boolean
-- =============================================
-- ADD ishasdeprecond
alter table act."itemclasstype" add ishasdeprecond boolean not null default false;
comment on column act."itemclasstype".ishasdeprecond is '';

-- MODIFY ishasdeprecond
alter table act."itemclasstype"
	alter column ishasdeprecond type boolean,
	ALTER COLUMN ishasdeprecond SET DEFAULT false,
	ALTER COLUMN ishasdeprecond SET NOT NULL;
comment on column act."itemclasstype".ishasdeprecond is '';


-- =============================================
-- FIELD: ishasexpensecoa boolean
-- =============================================
-- ADD ishasexpensecoa
alter table act."itemclasstype" add ishasexpensecoa boolean not null default false;
comment on column act."itemclasstype".ishasexpensecoa is '';

-- MODIFY ishasexpensecoa
alter table act."itemclasstype"
	alter column ishasexpensecoa type boolean,
	ALTER COLUMN ishasexpensecoa SET DEFAULT false,
	ALTER COLUMN ishasexpensecoa SET NOT NULL;
comment on column act."itemclasstype".ishasexpensecoa is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."itemclasstype" add _createby integer not null ;
comment on column act."itemclasstype"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."itemclasstype"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."itemclasstype"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."itemclasstype" add _createdate timestamp with time zone not null default now();
comment on column act."itemclasstype"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."itemclasstype"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."itemclasstype"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."itemclasstype" add _modifyby integer  ;
comment on column act."itemclasstype"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."itemclasstype"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."itemclasstype"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."itemclasstype" add _modifydate timestamp with time zone  ;
comment on column act."itemclasstype"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."itemclasstype"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."itemclasstype"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Drop Existing Foreign Key Constraint 
ALTER TABLE act."itemclasstype" DROP CONSTRAINT fk$act$itemclasstype$itemmanage_id;


-- Add Foreign Key Constraint  
ALTER TABLE act."itemclasstype"
	ADD CONSTRAINT fk$act$itemclasstype$itemmanage_id
	FOREIGN KEY (itemmanage_id)
	REFERENCES act."itemmanage"(itemmanage_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$itemclasstype$itemmanage_id;
CREATE INDEX idx_fk$act$itemclasstype$itemmanage_id ON act."itemclasstype"(itemmanage_id);	

	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table act."itemclasstype"
	drop constraint uq$act$itemclasstype$itemclasstype_name;
	

-- Add unique index 
alter table  act."itemclasstype"
	add constraint uq$act$itemclasstype$itemclasstype_name unique (itemclasstype_name); 

