-- jurnaltype.sql


/* =============================================
 * CREATE TABLE act."jurnaltypecoa"
 * ============================================*/
create table act."jurnaltypecoa" (
	jurnaltypecoa_id bigint not null,
	constraint jurnaltypecoa_pk primary key (jurnaltypecoa_id)
);
comment on table act."jurnaltypecoa" is '';	


-- =============================================
-- FIELD: coa_id int
-- =============================================
-- ADD coa_id
alter table act."jurnaltypecoa" add coa_id int  ;
comment on column act."jurnaltypecoa".coa_id is '';

-- MODIFY coa_id
alter table act."jurnaltypecoa"
	alter column coa_id type int,
	ALTER COLUMN coa_id DROP DEFAULT,
	ALTER COLUMN coa_id DROP NOT NULL;
comment on column act."jurnaltypecoa".coa_id is '';


-- =============================================
-- FIELD: jurnaltypecoa_isdr boolean
-- =============================================
-- ADD jurnaltypecoa_isdr
alter table act."jurnaltypecoa" add jurnaltypecoa_isdr boolean not null default false;
comment on column act."jurnaltypecoa".jurnaltypecoa_isdr is '';

-- MODIFY jurnaltypecoa_isdr
alter table act."jurnaltypecoa"
	alter column jurnaltypecoa_isdr type boolean,
	ALTER COLUMN jurnaltypecoa_isdr SET DEFAULT false,
	ALTER COLUMN jurnaltypecoa_isdr SET NOT NULL;
comment on column act."jurnaltypecoa".jurnaltypecoa_isdr is '';


-- =============================================
-- FIELD: jurnaltypecoa_iscr boolean
-- =============================================
-- ADD jurnaltypecoa_iscr
alter table act."jurnaltypecoa" add jurnaltypecoa_iscr boolean not null default false;
comment on column act."jurnaltypecoa".jurnaltypecoa_iscr is '';

-- MODIFY jurnaltypecoa_iscr
alter table act."jurnaltypecoa"
	alter column jurnaltypecoa_iscr type boolean,
	ALTER COLUMN jurnaltypecoa_iscr SET DEFAULT false,
	ALTER COLUMN jurnaltypecoa_iscr SET NOT NULL;
comment on column act."jurnaltypecoa".jurnaltypecoa_iscr is '';


-- =============================================
-- FIELD: jurnaltype_id smallint
-- =============================================
-- ADD jurnaltype_id
alter table act."jurnaltypecoa" add jurnaltype_id smallint  ;
comment on column act."jurnaltypecoa".jurnaltype_id is '';

-- MODIFY jurnaltype_id
alter table act."jurnaltypecoa"
	alter column jurnaltype_id type smallint,
	ALTER COLUMN jurnaltype_id DROP DEFAULT,
	ALTER COLUMN jurnaltype_id DROP NOT NULL;
comment on column act."jurnaltypecoa".jurnaltype_id is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."jurnaltypecoa" add _createby integer not null ;
comment on column act."jurnaltypecoa"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."jurnaltypecoa"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."jurnaltypecoa"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."jurnaltypecoa" add _createdate timestamp with time zone not null default now();
comment on column act."jurnaltypecoa"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."jurnaltypecoa"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."jurnaltypecoa"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."jurnaltypecoa" add _modifyby integer  ;
comment on column act."jurnaltypecoa"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."jurnaltypecoa"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."jurnaltypecoa"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."jurnaltypecoa" add _modifydate timestamp with time zone  ;
comment on column act."jurnaltypecoa"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."jurnaltypecoa"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."jurnaltypecoa"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Drop Existing Foreign Key Constraint 
ALTER TABLE act."jurnaltypecoa" DROP CONSTRAINT fk$act$jurnaltypecoa$jurnaltype_id;
ALTER TABLE act."jurnaltypecoa" DROP CONSTRAINT fk$act$jurnaltypecoa$coa_id;


-- Add Foreign Key Constraint  
ALTER TABLE act."jurnaltypecoa"
	ADD CONSTRAINT fk$act$jurnaltypecoa$coa_id
	FOREIGN KEY (coa_id)
	REFERENCES act."coa"(coa_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$jurnaltypecoa$coa_id;
CREATE INDEX idx_fk$act$jurnaltypecoa$coa_id ON act."jurnaltypecoa"(coa_id);	


ALTER TABLE act."jurnaltypecoa"
	ADD CONSTRAINT fk$act$jurnaltypecoa$jurnaltype_id
	FOREIGN KEY (jurnaltype_id)
	REFERENCES act."jurnaltype"(jurnaltype_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$jurnaltypecoa$jurnaltype_id;
CREATE INDEX idx_fk$act$jurnaltypecoa$jurnaltype_id ON act."jurnaltypecoa"(jurnaltype_id);	

	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table act."jurnaltypecoa"
	drop constraint uq$act$jurnaltypecoa$jurnaltypecoa_pair;
	

-- Add unique index 
alter table  act."jurnaltypecoa"
	add constraint uq$act$jurnaltypecoa$jurnaltypecoa_pair unique (jurnaltype_id, coa_id); 

