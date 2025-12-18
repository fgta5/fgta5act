-- bctype.sql


/* =============================================
 * CREATE TABLE act."bctype"
 * ============================================*/
create table act."bctype" (
	bctype_id int not null,
	constraint bctype_pk primary key (bctype_id)
);
comment on table act."bctype" is '';	


-- =============================================
-- FIELD: bctype_isdisabled boolean
-- =============================================
-- ADD bctype_isdisabled
alter table act."bctype" add bctype_isdisabled boolean not null default false;
comment on column act."bctype".bctype_isdisabled is '';

-- MODIFY bctype_isdisabled
alter table act."bctype"
	alter column bctype_isdisabled type boolean,
	ALTER COLUMN bctype_isdisabled SET DEFAULT false,
	ALTER COLUMN bctype_isdisabled SET NOT NULL;
comment on column act."bctype".bctype_isdisabled is '';


-- =============================================
-- FIELD: bccycle_id smallint
-- =============================================
-- ADD bccycle_id
alter table act."bctype" add bccycle_id smallint  ;
comment on column act."bctype".bccycle_id is '';

-- MODIFY bccycle_id
alter table act."bctype"
	alter column bccycle_id type smallint,
	ALTER COLUMN bccycle_id DROP DEFAULT,
	ALTER COLUMN bccycle_id DROP NOT NULL;
comment on column act."bctype".bccycle_id is '';


-- =============================================
-- FIELD: isalldept boolean
-- =============================================
-- ADD isalldept
alter table act."bctype" add isalldept boolean not null default false;
comment on column act."bctype".isalldept is '';

-- MODIFY isalldept
alter table act."bctype"
	alter column isalldept type boolean,
	ALTER COLUMN isalldept SET DEFAULT false,
	ALTER COLUMN isalldept SET NOT NULL;
comment on column act."bctype".isalldept is '';


-- =============================================
-- FIELD: bctype_name text
-- =============================================
-- ADD bctype_name
alter table act."bctype" add bctype_name text  ;
comment on column act."bctype".bctype_name is '';

-- MODIFY bctype_name
alter table act."bctype"
	alter column bctype_name type text,
	ALTER COLUMN bctype_name DROP DEFAULT,
	ALTER COLUMN bctype_name DROP NOT NULL;
comment on column act."bctype".bctype_name is '';


-- =============================================
-- FIELD: bctype_code text
-- =============================================
-- ADD bctype_code
alter table act."bctype" add bctype_code text  ;
comment on column act."bctype".bctype_code is '';

-- MODIFY bctype_code
alter table act."bctype"
	alter column bctype_code type text,
	ALTER COLUMN bctype_code DROP DEFAULT,
	ALTER COLUMN bctype_code DROP NOT NULL;
comment on column act."bctype".bctype_code is '';


-- =============================================
-- FIELD: bctype_descr text
-- =============================================
-- ADD bctype_descr
alter table act."bctype" add bctype_descr text  ;
comment on column act."bctype".bctype_descr is '';

-- MODIFY bctype_descr
alter table act."bctype"
	alter column bctype_descr type text,
	ALTER COLUMN bctype_descr DROP DEFAULT,
	ALTER COLUMN bctype_descr DROP NOT NULL;
comment on column act."bctype".bctype_descr is '';


-- =============================================
-- FIELD: approvalmodel_id int
-- =============================================
-- ADD approvalmodel_id
alter table act."bctype" add approvalmodel_id int  ;
comment on column act."bctype".approvalmodel_id is '';

-- MODIFY approvalmodel_id
alter table act."bctype"
	alter column approvalmodel_id type int,
	ALTER COLUMN approvalmodel_id DROP DEFAULT,
	ALTER COLUMN approvalmodel_id DROP NOT NULL;
comment on column act."bctype".approvalmodel_id is '';


-- =============================================
-- FIELD: paymreqtype_id smallint
-- =============================================
-- ADD paymreqtype_id
alter table act."bctype" add paymreqtype_id smallint  ;
comment on column act."bctype".paymreqtype_id is '';

-- MODIFY paymreqtype_id
alter table act."bctype"
	alter column paymreqtype_id type smallint,
	ALTER COLUMN paymreqtype_id DROP DEFAULT,
	ALTER COLUMN paymreqtype_id DROP NOT NULL;
comment on column act."bctype".paymreqtype_id is '';


-- =============================================
-- FIELD: agingtype_id smallint
-- =============================================
-- ADD agingtype_id
alter table act."bctype" add agingtype_id smallint  ;
comment on column act."bctype".agingtype_id is '';

-- MODIFY agingtype_id
alter table act."bctype"
	alter column agingtype_id type smallint,
	ALTER COLUMN agingtype_id DROP DEFAULT,
	ALTER COLUMN agingtype_id DROP NOT NULL;
comment on column act."bctype".agingtype_id is '';


-- =============================================
-- FIELD: isusecoaclass boolean
-- =============================================
-- ADD isusecoaclass
alter table act."bctype" add isusecoaclass boolean not null default false;
comment on column act."bctype".isusecoaclass is '';

-- MODIFY isusecoaclass
alter table act."bctype"
	alter column isusecoaclass type boolean,
	ALTER COLUMN isusecoaclass SET DEFAULT false,
	ALTER COLUMN isusecoaclass SET NOT NULL;
comment on column act."bctype".isusecoaclass is '';


-- =============================================
-- FIELD: isusecurr boolean
-- =============================================
-- ADD isusecurr
alter table act."bctype" add isusecurr boolean not null default false;
comment on column act."bctype".isusecurr is '';

-- MODIFY isusecurr
alter table act."bctype"
	alter column isusecurr type boolean,
	ALTER COLUMN isusecurr SET DEFAULT false,
	ALTER COLUMN isusecurr SET NOT NULL;
comment on column act."bctype".isusecurr is '';


-- =============================================
-- FIELD: isuseapproval boolean
-- =============================================
-- ADD isuseapproval
alter table act."bctype" add isuseapproval boolean not null default false;
comment on column act."bctype".isuseapproval is '';

-- MODIFY isuseapproval
alter table act."bctype"
	alter column isuseapproval type boolean,
	ALTER COLUMN isuseapproval SET DEFAULT false,
	ALTER COLUMN isuseapproval SET NOT NULL;
comment on column act."bctype".isuseapproval is '';


-- =============================================
-- FIELD: isusepaymreq boolean
-- =============================================
-- ADD isusepaymreq
alter table act."bctype" add isusepaymreq boolean not null default false;
comment on column act."bctype".isusepaymreq is '';

-- MODIFY isusepaymreq
alter table act."bctype"
	alter column isusepaymreq type boolean,
	ALTER COLUMN isusepaymreq SET DEFAULT false,
	ALTER COLUMN isusepaymreq SET NOT NULL;
comment on column act."bctype".isusepaymreq is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."bctype" add _createby integer not null ;
comment on column act."bctype"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."bctype"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."bctype"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."bctype" add _createdate timestamp with time zone not null default now();
comment on column act."bctype"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."bctype"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."bctype"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."bctype" add _modifyby integer  ;
comment on column act."bctype"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."bctype"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."bctype"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."bctype" add _modifydate timestamp with time zone  ;
comment on column act."bctype"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."bctype"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."bctype"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Drop Existing Foreign Key Constraint 
ALTER TABLE act."bctype" DROP CONSTRAINT fk$act$bctype$agingtype_id;
ALTER TABLE act."bctype" DROP CONSTRAINT fk$act$bctype$paymreqtype_id;
ALTER TABLE act."bctype" DROP CONSTRAINT fk$act$bctype$bccycle_id;
ALTER TABLE act."bctype" DROP CONSTRAINT fk$act$bctype$approvaltype_id;


-- Add Foreign Key Constraint  
ALTER TABLE act."bctype"
	ADD CONSTRAINT fk$act$bctype$bccycle_id
	FOREIGN KEY (bccycle_id)
	REFERENCES act."bccycle"(bccycle_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bctype$bccycle_id;
CREATE INDEX idx_fk$act$bctype$bccycle_id ON act."bctype"(bccycle_id);	


ALTER TABLE act."bctype"
	ADD CONSTRAINT fk$act$bctype$approvalmodel_id
	FOREIGN KEY (approvalmodel_id)
	REFERENCES ent."approvalmodel"(approvalmodel_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bctype$approvalmodel_id;
CREATE INDEX idx_fk$act$bctype$approvalmodel_id ON act."bctype"(approvalmodel_id);	


ALTER TABLE act."bctype"
	ADD CONSTRAINT fk$act$bctype$paymreqtype_id
	FOREIGN KEY (paymreqtype_id)
	REFERENCES act."paymreqtype"(paymreqtype_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bctype$paymreqtype_id;
CREATE INDEX idx_fk$act$bctype$paymreqtype_id ON act."bctype"(paymreqtype_id);	


ALTER TABLE act."bctype"
	ADD CONSTRAINT fk$act$bctype$agingtype_id
	FOREIGN KEY (agingtype_id)
	REFERENCES act."agingtype"(agingtype_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bctype$agingtype_id;
CREATE INDEX idx_fk$act$bctype$agingtype_id ON act."bctype"(agingtype_id);	

	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table act."bctype"
	drop constraint uq$act$bctype$bctype_code;

alter table act."bctype"
	drop constraint uq$act$bctype$bctype_name;
	

-- Add unique index 
alter table  act."bctype"
	add constraint uq$act$bctype$bctype_name unique (bctype_name); 

alter table  act."bctype"
	add constraint uq$act$bctype$bctype_code unique (bctype_code); 

