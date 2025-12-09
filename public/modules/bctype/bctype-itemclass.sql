-- bctype.sql


/* =============================================
 * CREATE TABLE act."bctypeitemclass"
 * ============================================*/
create table act."bctypeitemclass" (
	bctypeitemclass_id bigint not null,
	constraint bctypeitemclass_pk primary key (bctypeitemclass_id)
);
comment on table act."bctypeitemclass" is '';	


-- =============================================
-- FIELD: itemclass_id int
-- =============================================
-- ADD itemclass_id
alter table act."bctypeitemclass" add itemclass_id int  ;
comment on column act."bctypeitemclass".itemclass_id is '';

-- MODIFY itemclass_id
alter table act."bctypeitemclass"
	alter column itemclass_id type int,
	ALTER COLUMN itemclass_id DROP DEFAULT,
	ALTER COLUMN itemclass_id DROP NOT NULL;
comment on column act."bctypeitemclass".itemclass_id is '';


-- =============================================
-- FIELD: bctype_id int
-- =============================================
-- ADD bctype_id
alter table act."bctypeitemclass" add bctype_id int  ;
comment on column act."bctypeitemclass".bctype_id is '';

-- MODIFY bctype_id
alter table act."bctypeitemclass"
	alter column bctype_id type int,
	ALTER COLUMN bctype_id DROP DEFAULT,
	ALTER COLUMN bctype_id DROP NOT NULL;
comment on column act."bctypeitemclass".bctype_id is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."bctypeitemclass" add _createby integer not null ;
comment on column act."bctypeitemclass"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."bctypeitemclass"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."bctypeitemclass"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."bctypeitemclass" add _createdate timestamp with time zone not null default now();
comment on column act."bctypeitemclass"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."bctypeitemclass"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."bctypeitemclass"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."bctypeitemclass" add _modifyby integer  ;
comment on column act."bctypeitemclass"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."bctypeitemclass"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."bctypeitemclass"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."bctypeitemclass" add _modifydate timestamp with time zone  ;
comment on column act."bctypeitemclass"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."bctypeitemclass"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."bctypeitemclass"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Drop Existing Foreign Key Constraint 
ALTER TABLE act."bctypeitemclass" DROP CONSTRAINT fk$act$bctypeitemclass$bctype_id;
ALTER TABLE act."bctypeitemclass" DROP CONSTRAINT fk$act$bctypeitemclass$itemclass_id;


-- Add Foreign Key Constraint  
ALTER TABLE act."bctypeitemclass"
	ADD CONSTRAINT fk$act$bctypeitemclass$itemclass_id
	FOREIGN KEY (itemclass_id)
	REFERENCES act."itemclass"(itemclass_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bctypeitemclass$itemclass_id;
CREATE INDEX idx_fk$act$bctypeitemclass$itemclass_id ON act."bctypeitemclass"(itemclass_id);	


ALTER TABLE act."bctypeitemclass"
	ADD CONSTRAINT fk$act$bctypeitemclass$bctype_id
	FOREIGN KEY (bctype_id)
	REFERENCES act."bctype"(bctype_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$bctypeitemclass$bctype_id;
CREATE INDEX idx_fk$act$bctypeitemclass$bctype_id ON act."bctypeitemclass"(bctype_id);	

	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table act."bctypeitemclass"
	drop constraint uq$act$bctypeitemclass$bctypeitemclass_pair;
	

-- Add unique index 
alter table  act."bctypeitemclass"
	add constraint uq$act$bctypeitemclass$bctypeitemclass_pair unique (bctype_id, itemclass_id); 

