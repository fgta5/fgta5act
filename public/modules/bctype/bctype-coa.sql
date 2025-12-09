-- bctype.sql


/* =============================================
 * CREATE TABLE act."bctypecoa"
 * ============================================*/
create table act."bctypecoa" (
	bctypecoa_id bigint not null,
	constraint bctypecoa_pk primary key (bctypecoa_id)
);
comment on table act."bctypecoa" is '';	


-- =============================================
-- FIELD: curr_id smallint
-- =============================================
-- ADD curr_id
alter table act."bctypecoa" add curr_id smallint  ;
comment on column act."bctypecoa".curr_id is '';

-- MODIFY curr_id
alter table act."bctypecoa"
	alter column curr_id type smallint,
	ALTER COLUMN curr_id DROP DEFAULT,
	ALTER COLUMN curr_id DROP NOT NULL;
comment on column act."bctypecoa".curr_id is '';


-- =============================================
-- FIELD: coa_id int
-- =============================================
-- ADD coa_id
alter table act."bctypecoa" add coa_id int  ;
comment on column act."bctypecoa".coa_id is '';

-- MODIFY coa_id
alter table act."bctypecoa"
	alter column coa_id type int,
	ALTER COLUMN coa_id DROP DEFAULT,
	ALTER COLUMN coa_id DROP NOT NULL;
comment on column act."bctypecoa".coa_id is '';


-- =============================================
-- FIELD: bctype_id int
-- =============================================
-- ADD bctype_id
alter table act."bctypecoa" add bctype_id int  ;
comment on column act."bctypecoa".bctype_id is '';

-- MODIFY bctype_id
alter table act."bctypecoa"
	alter column bctype_id type int,
	ALTER COLUMN bctype_id DROP DEFAULT,
	ALTER COLUMN bctype_id DROP NOT NULL;
comment on column act."bctypecoa".bctype_id is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."bctypecoa" add _createby integer not null ;
comment on column act."bctypecoa"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."bctypecoa"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."bctypecoa"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."bctypecoa" add _createdate timestamp with time zone not null default now();
comment on column act."bctypecoa"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."bctypecoa"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."bctypecoa"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."bctypecoa" add _modifyby integer  ;
comment on column act."bctypecoa"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."bctypecoa"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."bctypecoa"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."bctypecoa" add _modifydate timestamp with time zone  ;
comment on column act."bctypecoa"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."bctypecoa"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."bctypecoa"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Drop Existing Foreign Key Constraint 
ALTER TABLE act."bctypecoa" DROP CONSTRAINT fk$act$bctypecoa$bctype_id;
ALTER TABLE act."bctypecoa" DROP CONSTRAINT fk$act$bctypecoa$coa_id;
ALTER TABLE act."bctypecoa" DROP CONSTRAINT fk$act$bctypecoa$curr_id;


-- Add Foreign Key Constraint  
ALTER TABLE act."bctypecoa"
	ADD CONSTRAINT fk$act$bctypecoa$curr_id
	FOREIGN KEY (curr_id)
	REFERENCES ent."curr"(curr_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bctypecoa$curr_id;
CREATE INDEX idx_fk$act$bctypecoa$curr_id ON act."bctypecoa"(curr_id);	


ALTER TABLE act."bctypecoa"
	ADD CONSTRAINT fk$act$bctypecoa$coa_id
	FOREIGN KEY (coa_id)
	REFERENCES act."coa"(coa_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bctypecoa$coa_id;
CREATE INDEX idx_fk$act$bctypecoa$coa_id ON act."bctypecoa"(coa_id);	


ALTER TABLE act."bctypecoa"
	ADD CONSTRAINT fk$act$bctypecoa$bctype_id
	FOREIGN KEY (bctype_id)
	REFERENCES act."bctype"(bctype_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bctypecoa$bctype_id;
CREATE INDEX idx_fk$act$bctypecoa$bctype_id ON act."bctypecoa"(bctype_id);	

	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table act."bctypecoa"
	drop constraint uq$act$bctypecoa$bctypecoa_pair;
	

-- Add unique index 
alter table  act."bctypecoa"
	add constraint uq$act$bctypecoa$bctypecoa_pair unique (bctype_id, curr_id); 

