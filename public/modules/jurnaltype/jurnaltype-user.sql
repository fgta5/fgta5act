-- jurnaltype.sql


/* =============================================
 * CREATE TABLE act."jurnaltypeuser"
 * ============================================*/
create table act."jurnaltypeuser" (
	jurnaltypeuser_id bigint not null,
	constraint jurnaltypeuser_pk primary key (jurnaltypeuser_id)
);
comment on table act."jurnaltypeuser" is '';	


-- =============================================
-- FIELD: user_id bigint
-- =============================================
-- ADD user_id
alter table act."jurnaltypeuser" add user_id bigint  ;
comment on column act."jurnaltypeuser".user_id is '';

-- MODIFY user_id
alter table act."jurnaltypeuser"
	alter column user_id type bigint,
	ALTER COLUMN user_id DROP DEFAULT,
	ALTER COLUMN user_id DROP NOT NULL;
comment on column act."jurnaltypeuser".user_id is '';


-- =============================================
-- FIELD: isallowposting boolean
-- =============================================
-- ADD isallowposting
alter table act."jurnaltypeuser" add isallowposting boolean not null default false;
comment on column act."jurnaltypeuser".isallowposting is '';

-- MODIFY isallowposting
alter table act."jurnaltypeuser"
	alter column isallowposting type boolean,
	ALTER COLUMN isallowposting SET DEFAULT false,
	ALTER COLUMN isallowposting SET NOT NULL;
comment on column act."jurnaltypeuser".isallowposting is '';


-- =============================================
-- FIELD: isallowunposting boolean
-- =============================================
-- ADD isallowunposting
alter table act."jurnaltypeuser" add isallowunposting boolean not null default false;
comment on column act."jurnaltypeuser".isallowunposting is '';

-- MODIFY isallowunposting
alter table act."jurnaltypeuser"
	alter column isallowunposting type boolean,
	ALTER COLUMN isallowunposting SET DEFAULT false,
	ALTER COLUMN isallowunposting SET NOT NULL;
comment on column act."jurnaltypeuser".isallowunposting is '';


-- =============================================
-- FIELD: jurnaltype_id smallint
-- =============================================
-- ADD jurnaltype_id
alter table act."jurnaltypeuser" add jurnaltype_id smallint  ;
comment on column act."jurnaltypeuser".jurnaltype_id is '';

-- MODIFY jurnaltype_id
alter table act."jurnaltypeuser"
	alter column jurnaltype_id type smallint,
	ALTER COLUMN jurnaltype_id DROP DEFAULT,
	ALTER COLUMN jurnaltype_id DROP NOT NULL;
comment on column act."jurnaltypeuser".jurnaltype_id is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."jurnaltypeuser" add _createby integer not null ;
comment on column act."jurnaltypeuser"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."jurnaltypeuser"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."jurnaltypeuser"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."jurnaltypeuser" add _createdate timestamp with time zone not null default now();
comment on column act."jurnaltypeuser"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."jurnaltypeuser"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."jurnaltypeuser"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."jurnaltypeuser" add _modifyby integer  ;
comment on column act."jurnaltypeuser"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."jurnaltypeuser"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."jurnaltypeuser"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."jurnaltypeuser" add _modifydate timestamp with time zone  ;
comment on column act."jurnaltypeuser"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."jurnaltypeuser"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."jurnaltypeuser"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Drop Existing Foreign Key Constraint 
ALTER TABLE act."jurnaltypeuser" DROP CONSTRAINT fk$act$jurnaltypeuser$jurnaltype_id;
ALTER TABLE act."jurnaltypeuser" DROP CONSTRAINT fk$act$jurnaltypeuser$user_id;


-- Add Foreign Key Constraint  
ALTER TABLE act."jurnaltypeuser"
	ADD CONSTRAINT fk$act$jurnaltypeuser$user_id
	FOREIGN KEY (user_id)
	REFERENCES core."user"(user_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$jurnaltypeuser$user_id;
CREATE INDEX idx_fk$act$jurnaltypeuser$user_id ON act."jurnaltypeuser"(user_id);	


ALTER TABLE act."jurnaltypeuser"
	ADD CONSTRAINT fk$act$jurnaltypeuser$jurnaltype_id
	FOREIGN KEY (jurnaltype_id)
	REFERENCES act."jurnaltype"(jurnaltype_id);


-- Add As Index, drop dulu jika sudah ada
DROP INDEX IF EXISTS act.idx_fk$act$jurnaltypeuser$jurnaltype_id;
CREATE INDEX idx_fk$act$jurnaltypeuser$jurnaltype_id ON act."jurnaltypeuser"(jurnaltype_id);	

	


-- =============================================
-- UNIQUE INDEX
-- =============================================