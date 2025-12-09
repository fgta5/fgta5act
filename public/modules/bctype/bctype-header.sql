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
-- FIELD: approvaltype_id int
-- =============================================
-- ADD approvaltype_id
alter table act."bctype" add approvaltype_id int  ;
comment on column act."bctype".approvaltype_id is '';

-- MODIFY approvaltype_id
alter table act."bctype"
	alter column approvaltype_id type int,
	ALTER COLUMN approvaltype_id DROP DEFAULT,
	ALTER COLUMN approvaltype_id DROP NOT NULL;
comment on column act."bctype".approvaltype_id is '';


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
ALTER TABLE act."bctype" DROP CONSTRAINT fk$act$bctype$approvaltype_id;


-- Add Foreign Key Constraint  
ALTER TABLE act."bctype"
	ADD CONSTRAINT fk$act$bctype$approvaltype_id
	FOREIGN KEY (approvaltype_id)
	REFERENCES core."approvaltype"(approvaltype_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bctype$approvaltype_id;
CREATE INDEX idx_fk$act$bctype$approvaltype_id ON act."bctype"(approvaltype_id);	


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
	drop constraint uq$act$bctype$bctype_name;
	

-- Add unique index 
alter table  act."bctype"
	add constraint uq$act$bctype$bctype_name unique (bctype_name); 

