-- bc.sql


/* =============================================
 * CREATE TABLE act."bc"
 * ============================================*/
create table act."bc" (
	bc_id bigint not null,
	constraint bc_pk primary key (bc_id)
);
comment on table act."bc" is '';	


-- =============================================
-- FIELD: bc_doc text
-- =============================================
-- ADD bc_doc
alter table act."bc" add bc_doc text  ;
comment on column act."bc".bc_doc is '';

-- MODIFY bc_doc
alter table act."bc"
	alter column bc_doc type text,
	ALTER COLUMN bc_doc DROP DEFAULT,
	ALTER COLUMN bc_doc DROP NOT NULL;
comment on column act."bc".bc_doc is '';


-- =============================================
-- FIELD: isapproved boolean
-- =============================================
-- ADD isapproved
alter table act."bc" add isapproved boolean not null default false;
comment on column act."bc".isapproved is '';

-- MODIFY isapproved
alter table act."bc"
	alter column isapproved type boolean,
	ALTER COLUMN isapproved SET DEFAULT false,
	ALTER COLUMN isapproved SET NOT NULL;
comment on column act."bc".isapproved is '';


-- =============================================
-- FIELD: bc_date date
-- =============================================
-- ADD bc_date
alter table act."bc" add bc_date date  default now();
comment on column act."bc".bc_date is '';

-- MODIFY bc_date
alter table act."bc"
	alter column bc_date type date,
	ALTER COLUMN bc_date SET DEFAULT now(),
	ALTER COLUMN bc_date DROP NOT NULL;
comment on column act."bc".bc_date is '';


-- =============================================
-- FIELD: dept_id int
-- =============================================
-- ADD dept_id
alter table act."bc" add dept_id int  ;
comment on column act."bc".dept_id is '';

-- MODIFY dept_id
alter table act."bc"
	alter column dept_id type int,
	ALTER COLUMN dept_id DROP DEFAULT,
	ALTER COLUMN dept_id DROP NOT NULL;
comment on column act."bc".dept_id is '';


-- =============================================
-- FIELD: bctype_id int
-- =============================================
-- ADD bctype_id
alter table act."bc" add bctype_id int  ;
comment on column act."bc".bctype_id is '';

-- MODIFY bctype_id
alter table act."bc"
	alter column bctype_id type int,
	ALTER COLUMN bctype_id DROP DEFAULT,
	ALTER COLUMN bctype_id DROP NOT NULL;
comment on column act."bc".bctype_id is '';


-- =============================================
-- FIELD: bc_title text
-- =============================================
-- ADD bc_title
alter table act."bc" add bc_title text  ;
comment on column act."bc".bc_title is '';

-- MODIFY bc_title
alter table act."bc"
	alter column bc_title type text,
	ALTER COLUMN bc_title DROP DEFAULT,
	ALTER COLUMN bc_title DROP NOT NULL;
comment on column act."bc".bc_title is '';


-- =============================================
-- FIELD: bc_descr text
-- =============================================
-- ADD bc_descr
alter table act."bc" add bc_descr text  ;
comment on column act."bc".bc_descr is '';

-- MODIFY bc_descr
alter table act."bc"
	alter column bc_descr type text,
	ALTER COLUMN bc_descr DROP DEFAULT,
	ALTER COLUMN bc_descr DROP NOT NULL;
comment on column act."bc".bc_descr is '';


-- =============================================
-- FIELD: curr_id smallint
-- =============================================
-- ADD curr_id
alter table act."bc" add curr_id smallint  ;
comment on column act."bc".curr_id is '';

-- MODIFY curr_id
alter table act."bc"
	alter column curr_id type smallint,
	ALTER COLUMN curr_id DROP DEFAULT,
	ALTER COLUMN curr_id DROP NOT NULL;
comment on column act."bc".curr_id is '';


-- =============================================
-- FIELD: coa_id int
-- =============================================
-- ADD coa_id
alter table act."bc" add coa_id int  ;
comment on column act."bc".coa_id is '';

-- MODIFY coa_id
alter table act."bc"
	alter column coa_id type int,
	ALTER COLUMN coa_id DROP DEFAULT,
	ALTER COLUMN coa_id DROP NOT NULL;
comment on column act."bc".coa_id is '';


-- =============================================
-- FIELD: bc_value decimal(9, 0)
-- =============================================
-- ADD bc_value
alter table act."bc" add bc_value decimal(9, 0) not null default 0;
comment on column act."bc".bc_value is '';

-- MODIFY bc_value
alter table act."bc"
	alter column bc_value type decimal(9, 0),
	ALTER COLUMN bc_value SET DEFAULT 0,
	ALTER COLUMN bc_value SET NOT NULL;
comment on column act."bc".bc_value is '';


-- =============================================
-- FIELD: paymreqtype_id smallint
-- =============================================
-- ADD paymreqtype_id
alter table act."bc" add paymreqtype_id smallint  ;
comment on column act."bc".paymreqtype_id is '';

-- MODIFY paymreqtype_id
alter table act."bc"
	alter column paymreqtype_id type smallint,
	ALTER COLUMN paymreqtype_id DROP DEFAULT,
	ALTER COLUMN paymreqtype_id DROP NOT NULL;
comment on column act."bc".paymreqtype_id is '';


-- =============================================
-- FIELD: approvalmodel_id int
-- =============================================
-- ADD approvalmodel_id
alter table act."bc" add approvalmodel_id int  ;
comment on column act."bc".approvalmodel_id is '';

-- MODIFY approvalmodel_id
alter table act."bc"
	alter column approvalmodel_id type int,
	ALTER COLUMN approvalmodel_id DROP DEFAULT,
	ALTER COLUMN approvalmodel_id DROP NOT NULL;
comment on column act."bc".approvalmodel_id is '';


-- =============================================
-- FIELD: approvedby text
-- =============================================
-- ADD approvedby
alter table act."bc" add approvedby text  ;
comment on column act."bc".approvedby is '';

-- MODIFY approvedby
alter table act."bc"
	alter column approvedby type text,
	ALTER COLUMN approvedby DROP DEFAULT,
	ALTER COLUMN approvedby DROP NOT NULL;
comment on column act."bc".approvedby is '';


-- =============================================
-- FIELD: approveddate text
-- =============================================
-- ADD approveddate
alter table act."bc" add approveddate text  ;
comment on column act."bc".approveddate is '';

-- MODIFY approveddate
alter table act."bc"
	alter column approveddate type text,
	ALTER COLUMN approveddate DROP DEFAULT,
	ALTER COLUMN approveddate DROP NOT NULL;
comment on column act."bc".approveddate is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."bc" add _createby integer not null ;
comment on column act."bc"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."bc"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."bc"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."bc" add _createdate timestamp with time zone not null default now();
comment on column act."bc"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."bc"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."bc"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."bc" add _modifyby integer  ;
comment on column act."bc"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."bc"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."bc"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."bc" add _modifydate timestamp with time zone  ;
comment on column act."bc"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."bc"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."bc"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Drop Existing Foreign Key Constraint 
ALTER TABLE act."bc" DROP CONSTRAINT fk$act$bc$paymreqtype_id;
ALTER TABLE act."bc" DROP CONSTRAINT fk$act$bc$coa_id;
ALTER TABLE act."bc" DROP CONSTRAINT fk$act$bc$curr_id;
ALTER TABLE act."bc" DROP CONSTRAINT fk$act$bc$bctype_id;
ALTER TABLE act."bc" DROP CONSTRAINT fk$act$bc$dept_id;
ALTER TABLE act."bc" DROP CONSTRAINT fk$act$bc$approvaltype_id;


-- Add Foreign Key Constraint  
ALTER TABLE act."bc"
	ADD CONSTRAINT fk$act$bc$dept_id
	FOREIGN KEY (dept_id)
	REFERENCES ent."dept"(dept_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bc$dept_id;
CREATE INDEX idx_fk$act$bc$dept_id ON act."bc"(dept_id);	


ALTER TABLE act."bc"
	ADD CONSTRAINT fk$act$bc$bctype_id
	FOREIGN KEY (bctype_id)
	REFERENCES act."bctype"(bctype_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bc$bctype_id;
CREATE INDEX idx_fk$act$bc$bctype_id ON act."bc"(bctype_id);	


ALTER TABLE act."bc"
	ADD CONSTRAINT fk$act$bc$curr_id
	FOREIGN KEY (curr_id)
	REFERENCES ent."curr"(curr_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bc$curr_id;
CREATE INDEX idx_fk$act$bc$curr_id ON act."bc"(curr_id);	


ALTER TABLE act."bc"
	ADD CONSTRAINT fk$act$bc$coa_id
	FOREIGN KEY (coa_id)
	REFERENCES act."coa"(coa_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bc$coa_id;
CREATE INDEX idx_fk$act$bc$coa_id ON act."bc"(coa_id);	


ALTER TABLE act."bc"
	ADD CONSTRAINT fk$act$bc$paymreqtype_id
	FOREIGN KEY (paymreqtype_id)
	REFERENCES act."paymreqtype"(paymreqtype_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bc$paymreqtype_id;
CREATE INDEX idx_fk$act$bc$paymreqtype_id ON act."bc"(paymreqtype_id);	


ALTER TABLE act."bc"
	ADD CONSTRAINT fk$act$bc$approvalmodel_id
	FOREIGN KEY (approvalmodel_id)
	REFERENCES ent."approvalmodel"(approvalmodel_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bc$approvalmodel_id;
CREATE INDEX idx_fk$act$bc$approvalmodel_id ON act."bc"(approvalmodel_id);	

	


-- =============================================
-- UNIQUE INDEX
-- =============================================