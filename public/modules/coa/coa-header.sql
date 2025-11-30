-- coa.sql


/* =============================================
 * CREATE TABLE act."coa"
 * ============================================*/
create table act."coa" (
	coa_id int not null,
	constraint coa_pk primary key (coa_id)
);
comment on table act."coa" is '';	


-- =============================================
-- FIELD: coa_isdisabled boolean
-- =============================================
-- ADD coa_isdisabled
alter table act."coa" add coa_isdisabled boolean not null default false;
comment on column act."coa".coa_isdisabled is '';

-- MODIFY coa_isdisabled
alter table act."coa"
	alter column coa_isdisabled type boolean,
	ALTER COLUMN coa_isdisabled SET DEFAULT false,
	ALTER COLUMN coa_isdisabled SET NOT NULL;
comment on column act."coa".coa_isdisabled is '';


-- =============================================
-- FIELD: coa_name text
-- =============================================
-- ADD coa_name
alter table act."coa" add coa_name text  ;
comment on column act."coa".coa_name is '';

-- MODIFY coa_name
alter table act."coa"
	alter column coa_name type text,
	ALTER COLUMN coa_name DROP DEFAULT,
	ALTER COLUMN coa_name DROP NOT NULL;
comment on column act."coa".coa_name is '';


-- =============================================
-- FIELD: coa_signfactor smallint
-- =============================================
-- ADD coa_signfactor
alter table act."coa" add coa_signfactor smallint not null default 1;
comment on column act."coa".coa_signfactor is '';

-- MODIFY coa_signfactor
alter table act."coa"
	alter column coa_signfactor type smallint,
	ALTER COLUMN coa_signfactor SET DEFAULT 1,
	ALTER COLUMN coa_signfactor SET NOT NULL;
comment on column act."coa".coa_signfactor is '';


-- =============================================
-- FIELD: coa_normal varchar(1)
-- =============================================
-- ADD coa_normal
alter table act."coa" add coa_normal varchar(1)  ;
comment on column act."coa".coa_normal is '';

-- MODIFY coa_normal
alter table act."coa"
	alter column coa_normal type varchar(1),
	ALTER COLUMN coa_normal DROP DEFAULT,
	ALTER COLUMN coa_normal DROP NOT NULL;
comment on column act."coa".coa_normal is '';


-- =============================================
-- FIELD: coa_descr text
-- =============================================
-- ADD coa_descr
alter table act."coa" add coa_descr text  ;
comment on column act."coa".coa_descr is '';

-- MODIFY coa_descr
alter table act."coa"
	alter column coa_descr type text,
	ALTER COLUMN coa_descr DROP DEFAULT,
	ALTER COLUMN coa_descr DROP NOT NULL;
comment on column act."coa".coa_descr is '';


-- =============================================
-- FIELD: coagroup_id smallint
-- =============================================
-- ADD coagroup_id
alter table act."coa" add coagroup_id smallint  ;
comment on column act."coa".coagroup_id is '';

-- MODIFY coagroup_id
alter table act."coa"
	alter column coagroup_id type smallint,
	ALTER COLUMN coagroup_id DROP DEFAULT,
	ALTER COLUMN coagroup_id DROP NOT NULL;
comment on column act."coa".coagroup_id is '';


-- =============================================
-- FIELD: agingtype_id smallint
-- =============================================
-- ADD agingtype_id
alter table act."coa" add agingtype_id smallint  ;
comment on column act."coa".agingtype_id is '';

-- MODIFY agingtype_id
alter table act."coa"
	alter column agingtype_id type smallint,
	ALTER COLUMN agingtype_id DROP DEFAULT,
	ALTER COLUMN agingtype_id DROP NOT NULL;
comment on column act."coa".agingtype_id is '';


-- =============================================
-- FIELD: coareporttype_id smallint
-- =============================================
-- ADD coareporttype_id
alter table act."coa" add coareporttype_id smallint  ;
comment on column act."coa".coareporttype_id is '';

-- MODIFY coareporttype_id
alter table act."coa"
	alter column coareporttype_id type smallint,
	ALTER COLUMN coareporttype_id DROP DEFAULT,
	ALTER COLUMN coareporttype_id DROP NOT NULL;
comment on column act."coa".coareporttype_id is '';


-- =============================================
-- FIELD: coa_istax boolean
-- =============================================
-- ADD coa_istax
alter table act."coa" add coa_istax boolean not null default false;
comment on column act."coa".coa_istax is '';

-- MODIFY coa_istax
alter table act."coa"
	alter column coa_istax type boolean,
	ALTER COLUMN coa_istax SET DEFAULT false,
	ALTER COLUMN coa_istax SET NOT NULL;
comment on column act."coa".coa_istax is '';


-- =============================================
-- FIELD: taxtype_id smallint
-- =============================================
-- ADD taxtype_id
alter table act."coa" add taxtype_id smallint  ;
comment on column act."coa".taxtype_id is '';

-- MODIFY taxtype_id
alter table act."coa"
	alter column taxtype_id type smallint,
	ALTER COLUMN taxtype_id DROP DEFAULT,
	ALTER COLUMN taxtype_id DROP NOT NULL;
comment on column act."coa".taxtype_id is '';


-- =============================================
-- FIELD: curr_id smallint
-- =============================================
-- ADD curr_id
alter table act."coa" add curr_id smallint  ;
comment on column act."coa".curr_id is '';

-- MODIFY curr_id
alter table act."coa"
	alter column curr_id type smallint,
	ALTER COLUMN curr_id DROP DEFAULT,
	ALTER COLUMN curr_id DROP NOT NULL;
comment on column act."coa".curr_id is '';


-- =============================================
-- FIELD: coa_iscurradj boolean
-- =============================================
-- ADD coa_iscurradj
alter table act."coa" add coa_iscurradj boolean not null default false;
comment on column act."coa".coa_iscurradj is '';

-- MODIFY coa_iscurradj
alter table act."coa"
	alter column coa_iscurradj type boolean,
	ALTER COLUMN coa_iscurradj SET DEFAULT false,
	ALTER COLUMN coa_iscurradj SET NOT NULL;
comment on column act."coa".coa_iscurradj is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."coa" add _createby integer not null ;
comment on column act."coa"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."coa"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."coa"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."coa" add _createdate timestamp with time zone not null default now();
comment on column act."coa"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."coa"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."coa"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."coa" add _modifyby integer  ;
comment on column act."coa"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."coa"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."coa"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."coa" add _modifydate timestamp with time zone  ;
comment on column act."coa"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."coa"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."coa"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Drop Existing Foreign Key Constraint 
ALTER TABLE act."coa" DROP CONSTRAINT fk$act$coa$curr_id;
ALTER TABLE act."coa" DROP CONSTRAINT fk$act$coa$taxtype_id;
ALTER TABLE act."coa" DROP CONSTRAINT fk$act$coa$coareporttype_id;
ALTER TABLE act."coa" DROP CONSTRAINT fk$act$coa$agingtype_id;
ALTER TABLE act."coa" DROP CONSTRAINT fk$act$coa$coagroup_id;


-- Add Foreign Key Constraint  
ALTER TABLE act."coa"
	ADD CONSTRAINT fk$act$coa$coagroup_id
	FOREIGN KEY (coagroup_id)
	REFERENCES act."coagroup"(coagroup_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$coa$coagroup_id;
CREATE INDEX idx_fk$act$coa$coagroup_id ON act."coa"(coagroup_id);	


ALTER TABLE act."coa"
	ADD CONSTRAINT fk$act$coa$agingtype_id
	FOREIGN KEY (agingtype_id)
	REFERENCES act."agingtype"(agingtype_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$coa$agingtype_id;
CREATE INDEX idx_fk$act$coa$agingtype_id ON act."coa"(agingtype_id);	


ALTER TABLE act."coa"
	ADD CONSTRAINT fk$act$coa$coareporttype_id
	FOREIGN KEY (coareporttype_id)
	REFERENCES act."coareporttype"(coareporttype_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$coa$coareporttype_id;
CREATE INDEX idx_fk$act$coa$coareporttype_id ON act."coa"(coareporttype_id);	


ALTER TABLE act."coa"
	ADD CONSTRAINT fk$act$coa$taxtype_id
	FOREIGN KEY (taxtype_id)
	REFERENCES act."taxtype"(taxtype_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$coa$taxtype_id;
CREATE INDEX idx_fk$act$coa$taxtype_id ON act."coa"(taxtype_id);	


ALTER TABLE act."coa"
	ADD CONSTRAINT fk$act$coa$curr_id
	FOREIGN KEY (curr_id)
	REFERENCES ent."curr"(curr_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$coa$curr_id;
CREATE INDEX idx_fk$act$coa$curr_id ON act."coa"(curr_id);	

	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table act."coa"
	drop constraint uq$act$coa$coa_name;
	

-- Add unique index 
alter table  act."coa"
	add constraint uq$act$coa$coa_name unique (coa_name); 

