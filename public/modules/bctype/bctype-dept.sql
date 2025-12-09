-- bctype.sql


/* =============================================
 * CREATE TABLE act."bctypedept"
 * ============================================*/
create table act."bctypedept" (
	bctypedept_id bigint not null,
	constraint bctypedept_pk primary key (bctypedept_id)
);
comment on table act."bctypedept" is '';	


-- =============================================
-- FIELD: dept_id int
-- =============================================
-- ADD dept_id
alter table act."bctypedept" add dept_id int  ;
comment on column act."bctypedept".dept_id is '';

-- MODIFY dept_id
alter table act."bctypedept"
	alter column dept_id type int,
	ALTER COLUMN dept_id DROP DEFAULT,
	ALTER COLUMN dept_id DROP NOT NULL;
comment on column act."bctypedept".dept_id is '';


-- =============================================
-- FIELD: bctype_id int
-- =============================================
-- ADD bctype_id
alter table act."bctypedept" add bctype_id int  ;
comment on column act."bctypedept".bctype_id is '';

-- MODIFY bctype_id
alter table act."bctypedept"
	alter column bctype_id type int,
	ALTER COLUMN bctype_id DROP DEFAULT,
	ALTER COLUMN bctype_id DROP NOT NULL;
comment on column act."bctypedept".bctype_id is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."bctypedept" add _createby integer not null ;
comment on column act."bctypedept"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."bctypedept"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."bctypedept"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."bctypedept" add _createdate timestamp with time zone not null default now();
comment on column act."bctypedept"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."bctypedept"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."bctypedept"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."bctypedept" add _modifyby integer  ;
comment on column act."bctypedept"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."bctypedept"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."bctypedept"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."bctypedept" add _modifydate timestamp with time zone  ;
comment on column act."bctypedept"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."bctypedept"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."bctypedept"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Drop Existing Foreign Key Constraint 
ALTER TABLE act."bctypedept" DROP CONSTRAINT fk$act$bctypedept$bctype_id;
ALTER TABLE act."bctypedept" DROP CONSTRAINT fk$act$bctypedept$dept_id;


-- Add Foreign Key Constraint  
ALTER TABLE act."bctypedept"
	ADD CONSTRAINT fk$act$bctypedept$dept_id
	FOREIGN KEY (dept_id)
	REFERENCES ent."dept"(dept_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bctypedept$dept_id;
CREATE INDEX idx_fk$act$bctypedept$dept_id ON act."bctypedept"(dept_id);	


ALTER TABLE act."bctypedept"
	ADD CONSTRAINT fk$act$bctypedept$bctype_id
	FOREIGN KEY (bctype_id)
	REFERENCES act."bctype"(bctype_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bctypedept$bctype_id;
CREATE INDEX idx_fk$act$bctypedept$bctype_id ON act."bctypedept"(bctype_id);	

	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table act."bctypedept"
	drop constraint uq$act$bctypedept$bctypedept_pair;
	

-- Add unique index 
alter table  act."bctypedept"
	add constraint uq$act$bctypedept$bctypedept_pair unique (bctype_id, dept_id); 

