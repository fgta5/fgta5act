-- paymreq.sql


/* =============================================
 * CREATE TABLE act."paymreqterm"
 * ============================================*/
create table act."paymreqterm" (
	paymreqterm_id bigint not null,
	constraint paymreqterm_pk primary key (paymreqterm_id)
);
comment on table act."paymreqterm" is '';	


-- =============================================
-- FIELD: paymreqterm_descr text
-- =============================================
-- ADD paymreqterm_descr
alter table act."paymreqterm" add paymreqterm_descr text  ;
comment on column act."paymreqterm".paymreqterm_descr is '';

-- MODIFY paymreqterm_descr
alter table act."paymreqterm"
	alter column paymreqterm_descr type text,
	ALTER COLUMN paymreqterm_descr DROP DEFAULT,
	ALTER COLUMN paymreqterm_descr DROP NOT NULL;
comment on column act."paymreqterm".paymreqterm_descr is '';


-- =============================================
-- FIELD: paymreq_id bigint
-- =============================================
-- ADD paymreq_id
alter table act."paymreqterm" add paymreq_id bigint  ;
comment on column act."paymreqterm".paymreq_id is '';

-- MODIFY paymreq_id
alter table act."paymreqterm"
	alter column paymreq_id type bigint,
	ALTER COLUMN paymreq_id DROP DEFAULT,
	ALTER COLUMN paymreq_id DROP NOT NULL;
comment on column act."paymreqterm".paymreq_id is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."paymreqterm" add _createby integer not null ;
comment on column act."paymreqterm"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."paymreqterm"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."paymreqterm"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."paymreqterm" add _createdate timestamp with time zone not null default now();
comment on column act."paymreqterm"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."paymreqterm"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."paymreqterm"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."paymreqterm" add _modifyby integer  ;
comment on column act."paymreqterm"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."paymreqterm"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."paymreqterm"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."paymreqterm" add _modifydate timestamp with time zone  ;
comment on column act."paymreqterm"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."paymreqterm"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."paymreqterm"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Add Foreign Key Constraint  
ALTER TABLE act."paymreqterm"
	ADD CONSTRAINT fk$act$paymreqterm$paymreq_id
	FOREIGN KEY (paymreq_id)
	REFERENCES act."paymreq"(paymreq_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$paymreqterm$paymreq_id;
CREATE INDEX idx_fk$act$paymreqterm$paymreq_id ON act."paymreqterm"(paymreq_id);	

	


-- =============================================
-- UNIQUE INDEX
-- =============================================