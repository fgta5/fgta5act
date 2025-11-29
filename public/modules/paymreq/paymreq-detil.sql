-- paymreq.sql


/* =============================================
 * CREATE TABLE act."paymreqdetil"
 * ============================================*/
create table act."paymreqdetil" (
	paymreqdetil_id bigint not null,
	constraint paymreqdetil_pk primary key (paymreqdetil_id)
);
comment on table act."paymreqdetil" is '';	


-- =============================================
-- FIELD: paymreqdetil_descr text
-- =============================================
-- ADD paymreqdetil_descr
alter table act."paymreqdetil" add paymreqdetil_descr text  ;
comment on column act."paymreqdetil".paymreqdetil_descr is '';

-- MODIFY paymreqdetil_descr
alter table act."paymreqdetil"
	alter column paymreqdetil_descr type text,
	ALTER COLUMN paymreqdetil_descr DROP DEFAULT,
	ALTER COLUMN paymreqdetil_descr DROP NOT NULL;
comment on column act."paymreqdetil".paymreqdetil_descr is '';


-- =============================================
-- FIELD: paymreq_id bigint
-- =============================================
-- ADD paymreq_id
alter table act."paymreqdetil" add paymreq_id bigint  ;
comment on column act."paymreqdetil".paymreq_id is '';

-- MODIFY paymreq_id
alter table act."paymreqdetil"
	alter column paymreq_id type bigint,
	ALTER COLUMN paymreq_id DROP DEFAULT,
	ALTER COLUMN paymreq_id DROP NOT NULL;
comment on column act."paymreqdetil".paymreq_id is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."paymreqdetil" add _createby integer not null ;
comment on column act."paymreqdetil"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."paymreqdetil"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."paymreqdetil"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."paymreqdetil" add _createdate timestamp with time zone not null default now();
comment on column act."paymreqdetil"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."paymreqdetil"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."paymreqdetil"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."paymreqdetil" add _modifyby integer  ;
comment on column act."paymreqdetil"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."paymreqdetil"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."paymreqdetil"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."paymreqdetil" add _modifydate timestamp with time zone  ;
comment on column act."paymreqdetil"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."paymreqdetil"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."paymreqdetil"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Drop Existing Foreign Key Constraint 
ALTER TABLE act."paymreqdetil" DROP CONSTRAINT fk$act$paymreqdetil$paymreq_id;


-- Add Foreign Key Constraint  
ALTER TABLE act."paymreqdetil"
	ADD CONSTRAINT fk$act$paymreqdetil$paymreq_id
	FOREIGN KEY (paymreq_id)
	REFERENCES act."paymreq"(paymreq_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$paymreqdetil$paymreq_id;
CREATE INDEX idx_fk$act$paymreqdetil$paymreq_id ON act."paymreqdetil"(paymreq_id);	

	


-- =============================================
-- UNIQUE INDEX
-- =============================================