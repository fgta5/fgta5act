-- itemclass.sql


/* =============================================
 * CREATE TABLE act."itemclass"
 * ============================================*/
create table act."itemclass" (
	itemclass_id int not null,
	constraint itemclass_pk primary key (itemclass_id)
);
comment on table act."itemclass" is '';	


-- =============================================
-- FIELD: itemclass_isdisabled boolean
-- =============================================
-- ADD itemclass_isdisabled
alter table act."itemclass" add itemclass_isdisabled boolean not null default false;
comment on column act."itemclass".itemclass_isdisabled is '';

-- MODIFY itemclass_isdisabled
alter table act."itemclass"
	alter column itemclass_isdisabled type boolean,
	ALTER COLUMN itemclass_isdisabled SET DEFAULT false,
	ALTER COLUMN itemclass_isdisabled SET NOT NULL;
comment on column act."itemclass".itemclass_isdisabled is '';


-- =============================================
-- FIELD: itemclasstype_id smallint
-- =============================================
-- ADD itemclasstype_id
alter table act."itemclass" add itemclasstype_id smallint  ;
comment on column act."itemclass".itemclasstype_id is '';

-- MODIFY itemclasstype_id
alter table act."itemclass"
	alter column itemclasstype_id type smallint,
	ALTER COLUMN itemclasstype_id DROP DEFAULT,
	ALTER COLUMN itemclasstype_id DROP NOT NULL;
comment on column act."itemclass".itemclasstype_id is '';


-- =============================================
-- FIELD: dept_id int
-- =============================================
-- ADD dept_id
alter table act."itemclass" add dept_id int  ;
comment on column act."itemclass".dept_id is 'departemen owner dari itemclass ini';

-- MODIFY dept_id
alter table act."itemclass"
	alter column dept_id type int,
	ALTER COLUMN dept_id DROP DEFAULT,
	ALTER COLUMN dept_id DROP NOT NULL;
comment on column act."itemclass".dept_id is 'departemen owner dari itemclass ini';


-- =============================================
-- FIELD: itemclass_name text
-- =============================================
-- ADD itemclass_name
alter table act."itemclass" add itemclass_name text  ;
comment on column act."itemclass".itemclass_name is '';

-- MODIFY itemclass_name
alter table act."itemclass"
	alter column itemclass_name type text,
	ALTER COLUMN itemclass_name DROP DEFAULT,
	ALTER COLUMN itemclass_name DROP NOT NULL;
comment on column act."itemclass".itemclass_name is '';


-- =============================================
-- FIELD: itemmanage_id smallint
-- =============================================
-- ADD itemmanage_id
alter table act."itemclass" add itemmanage_id smallint  ;
comment on column act."itemclass".itemmanage_id is '';

-- MODIFY itemmanage_id
alter table act."itemclass"
	alter column itemmanage_id type smallint,
	ALTER COLUMN itemmanage_id DROP DEFAULT,
	ALTER COLUMN itemmanage_id DROP NOT NULL;
comment on column act."itemclass".itemmanage_id is '';


-- =============================================
-- FIELD: bs_coa_id int
-- =============================================
-- ADD bs_coa_id
alter table act."itemclass" add bs_coa_id int  ;
comment on column act."itemclass".bs_coa_id is '';

-- MODIFY bs_coa_id
alter table act."itemclass"
	alter column bs_coa_id type int,
	ALTER COLUMN bs_coa_id DROP DEFAULT,
	ALTER COLUMN bs_coa_id DROP NOT NULL;
comment on column act."itemclass".bs_coa_id is '';


-- =============================================
-- FIELD: depre_coa_id int
-- =============================================
-- ADD depre_coa_id
alter table act."itemclass" add depre_coa_id int  ;
comment on column act."itemclass".depre_coa_id is '';

-- MODIFY depre_coa_id
alter table act."itemclass"
	alter column depre_coa_id type int,
	ALTER COLUMN depre_coa_id DROP DEFAULT,
	ALTER COLUMN depre_coa_id DROP NOT NULL;
comment on column act."itemclass".depre_coa_id is '';


-- =============================================
-- FIELD: depremodel_id smallint
-- =============================================
-- ADD depremodel_id
alter table act."itemclass" add depremodel_id smallint  ;
comment on column act."itemclass".depremodel_id is '';

-- MODIFY depremodel_id
alter table act."itemclass"
	alter column depremodel_id type smallint,
	ALTER COLUMN depremodel_id DROP DEFAULT,
	ALTER COLUMN depremodel_id DROP NOT NULL;
comment on column act."itemclass".depremodel_id is '';


-- =============================================
-- FIELD: directexpensecond boolean
-- =============================================
-- ADD directexpensecond
alter table act."itemclass" add directexpensecond boolean not null default false;
comment on column act."itemclass".directexpensecond is '';

-- MODIFY directexpensecond
alter table act."itemclass"
	alter column directexpensecond type boolean,
	ALTER COLUMN directexpensecond SET DEFAULT false,
	ALTER COLUMN directexpensecond SET NOT NULL;
comment on column act."itemclass".directexpensecond is '';


-- =============================================
-- FIELD: bellowvalue decimal(13, 0)
-- =============================================
-- ADD bellowvalue
alter table act."itemclass" add bellowvalue decimal(13, 0) not null default 0;
comment on column act."itemclass".bellowvalue is '';

-- MODIFY bellowvalue
alter table act."itemclass"
	alter column bellowvalue type decimal(13, 0),
	ALTER COLUMN bellowvalue SET DEFAULT 0,
	ALTER COLUMN bellowvalue SET NOT NULL;
comment on column act."itemclass".bellowvalue is '';


-- =============================================
-- FIELD: expense_coa_id int
-- =============================================
-- ADD expense_coa_id
alter table act."itemclass" add expense_coa_id int  ;
comment on column act."itemclass".expense_coa_id is '';

-- MODIFY expense_coa_id
alter table act."itemclass"
	alter column expense_coa_id type int,
	ALTER COLUMN expense_coa_id DROP DEFAULT,
	ALTER COLUMN expense_coa_id DROP NOT NULL;
comment on column act."itemclass".expense_coa_id is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."itemclass" add _createby integer not null ;
comment on column act."itemclass"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."itemclass"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."itemclass"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."itemclass" add _createdate timestamp with time zone not null default now();
comment on column act."itemclass"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."itemclass"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."itemclass"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."itemclass" add _modifyby integer  ;
comment on column act."itemclass"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."itemclass"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."itemclass"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."itemclass" add _modifydate timestamp with time zone  ;
comment on column act."itemclass"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."itemclass"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."itemclass"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Drop Existing Foreign Key Constraint 
ALTER TABLE act."itemclass" DROP CONSTRAINT fk$act$itemclass$expense_coa_id;
ALTER TABLE act."itemclass" DROP CONSTRAINT fk$act$itemclass$depremodel_id;
ALTER TABLE act."itemclass" DROP CONSTRAINT fk$act$itemclass$depre_coa_id;
ALTER TABLE act."itemclass" DROP CONSTRAINT fk$act$itemclass$bs_coa_id;
ALTER TABLE act."itemclass" DROP CONSTRAINT fk$act$itemclass$itemmanage_id;
ALTER TABLE act."itemclass" DROP CONSTRAINT fk$act$itemclass$dept_id;
ALTER TABLE act."itemclass" DROP CONSTRAINT fk$act$itemclass$itemclasstype_id;


-- Add Foreign Key Constraint  
ALTER TABLE act."itemclass"
	ADD CONSTRAINT fk$act$itemclass$itemclasstype_id
	FOREIGN KEY (itemclasstype_id)
	REFERENCES act."itemclasstype"(itemclasstype_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$itemclass$itemclasstype_id;
CREATE INDEX idx_fk$act$itemclass$itemclasstype_id ON act."itemclass"(itemclasstype_id);	


ALTER TABLE act."itemclass"
	ADD CONSTRAINT fk$act$itemclass$dept_id
	FOREIGN KEY (dept_id)
	REFERENCES ent."dept"(dept_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$itemclass$dept_id;
CREATE INDEX idx_fk$act$itemclass$dept_id ON act."itemclass"(dept_id);	


ALTER TABLE act."itemclass"
	ADD CONSTRAINT fk$act$itemclass$itemmanage_id
	FOREIGN KEY (itemmanage_id)
	REFERENCES act."itemmanage"(itemmanage_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$itemclass$itemmanage_id;
CREATE INDEX idx_fk$act$itemclass$itemmanage_id ON act."itemclass"(itemmanage_id);	


ALTER TABLE act."itemclass"
	ADD CONSTRAINT fk$act$itemclass$bs_coa_id
	FOREIGN KEY (bs_coa_id)
	REFERENCES act."coa"(coa_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$itemclass$bs_coa_id;
CREATE INDEX idx_fk$act$itemclass$bs_coa_id ON act."itemclass"(bs_coa_id);	


ALTER TABLE act."itemclass"
	ADD CONSTRAINT fk$act$itemclass$depre_coa_id
	FOREIGN KEY (depre_coa_id)
	REFERENCES act."coa"(coa_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$itemclass$depre_coa_id;
CREATE INDEX idx_fk$act$itemclass$depre_coa_id ON act."itemclass"(depre_coa_id);	


ALTER TABLE act."itemclass"
	ADD CONSTRAINT fk$act$itemclass$depremodel_id
	FOREIGN KEY (depremodel_id)
	REFERENCES act."depremodel"(depremodel_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$itemclass$depremodel_id;
CREATE INDEX idx_fk$act$itemclass$depremodel_id ON act."itemclass"(depremodel_id);	


ALTER TABLE act."itemclass"
	ADD CONSTRAINT fk$act$itemclass$expense_coa_id
	FOREIGN KEY (expense_coa_id)
	REFERENCES act."coa"(coa_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$itemclass$expense_coa_id;
CREATE INDEX idx_fk$act$itemclass$expense_coa_id ON act."itemclass"(expense_coa_id);	

	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table act."itemclass"
	drop constraint uq$act$itemclass$itemclass_name;
	

-- Add unique index 
alter table  act."itemclass"
	add constraint uq$act$itemclass$itemclass_name unique (itemclass_name); 

