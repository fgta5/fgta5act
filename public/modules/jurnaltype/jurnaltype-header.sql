-- jurnaltype.sql


/* =============================================
 * CREATE TABLE act."jurnaltype"
 * ============================================*/
create table act."jurnaltype" (
	jurnaltype_id smallint not null,
	constraint jurnaltype_pk primary key (jurnaltype_id)
);
comment on table act."jurnaltype" is '';	


-- =============================================
-- FIELD: jurnaltype_code text
-- =============================================
-- ADD jurnaltype_code
alter table act."jurnaltype" add jurnaltype_code text  ;
comment on column act."jurnaltype".jurnaltype_code is '';

-- MODIFY jurnaltype_code
alter table act."jurnaltype"
	alter column jurnaltype_code type text,
	ALTER COLUMN jurnaltype_code DROP DEFAULT,
	ALTER COLUMN jurnaltype_code DROP NOT NULL;
comment on column act."jurnaltype".jurnaltype_code is '';


-- =============================================
-- FIELD: jurnaltype_isallowselect boolean
-- =============================================
-- ADD jurnaltype_isallowselect
alter table act."jurnaltype" add jurnaltype_isallowselect boolean not null default false;
comment on column act."jurnaltype".jurnaltype_isallowselect is '';

-- MODIFY jurnaltype_isallowselect
alter table act."jurnaltype"
	alter column jurnaltype_isallowselect type boolean,
	ALTER COLUMN jurnaltype_isallowselect SET DEFAULT false,
	ALTER COLUMN jurnaltype_isallowselect SET NOT NULL;
comment on column act."jurnaltype".jurnaltype_isallowselect is '';


-- =============================================
-- FIELD: jurnaltype_name text
-- =============================================
-- ADD jurnaltype_name
alter table act."jurnaltype" add jurnaltype_name text  ;
comment on column act."jurnaltype".jurnaltype_name is '';

-- MODIFY jurnaltype_name
alter table act."jurnaltype"
	alter column jurnaltype_name type text,
	ALTER COLUMN jurnaltype_name DROP DEFAULT,
	ALTER COLUMN jurnaltype_name DROP NOT NULL;
comment on column act."jurnaltype".jurnaltype_name is '';


-- =============================================
-- FIELD: jurnaltype_descr text
-- =============================================
-- ADD jurnaltype_descr
alter table act."jurnaltype" add jurnaltype_descr text  ;
comment on column act."jurnaltype".jurnaltype_descr is '';

-- MODIFY jurnaltype_descr
alter table act."jurnaltype"
	alter column jurnaltype_descr type text,
	ALTER COLUMN jurnaltype_descr DROP DEFAULT,
	ALTER COLUMN jurnaltype_descr DROP NOT NULL;
comment on column act."jurnaltype".jurnaltype_descr is '';


-- =============================================
-- FIELD: jurnaltype_headcopyto varchar(1)
-- =============================================
-- ADD jurnaltype_headcopyto
alter table act."jurnaltype" add jurnaltype_headcopyto varchar(1)  ;
comment on column act."jurnaltype".jurnaltype_headcopyto is '';

-- MODIFY jurnaltype_headcopyto
alter table act."jurnaltype"
	alter column jurnaltype_headcopyto type varchar(1),
	ALTER COLUMN jurnaltype_headcopyto DROP DEFAULT,
	ALTER COLUMN jurnaltype_headcopyto DROP NOT NULL;
comment on column act."jurnaltype".jurnaltype_headcopyto is '';


-- =============================================
-- FIELD: isheadhasduedate boolean
-- =============================================
-- ADD isheadhasduedate
alter table act."jurnaltype" add isheadhasduedate boolean not null default false;
comment on column act."jurnaltype".isheadhasduedate is '';

-- MODIFY isheadhasduedate
alter table act."jurnaltype"
	alter column isheadhasduedate type boolean,
	ALTER COLUMN isheadhasduedate SET DEFAULT false,
	ALTER COLUMN isheadhasduedate SET NOT NULL;
comment on column act."jurnaltype".isheadhasduedate is '';


-- =============================================
-- FIELD: isheadhasvalue boolean
-- =============================================
-- ADD isheadhasvalue
alter table act."jurnaltype" add isheadhasvalue boolean not null default false;
comment on column act."jurnaltype".isheadhasvalue is '';

-- MODIFY isheadhasvalue
alter table act."jurnaltype"
	alter column isheadhasvalue type boolean,
	ALTER COLUMN isheadhasvalue SET DEFAULT false,
	ALTER COLUMN isheadhasvalue SET NOT NULL;
comment on column act."jurnaltype".isheadhasvalue is '';


-- =============================================
-- FIELD: isheadhascoa boolean
-- =============================================
-- ADD isheadhascoa
alter table act."jurnaltype" add isheadhascoa boolean not null default false;
comment on column act."jurnaltype".isheadhascoa is '';

-- MODIFY isheadhascoa
alter table act."jurnaltype"
	alter column isheadhascoa type boolean,
	ALTER COLUMN isheadhascoa SET DEFAULT false,
	ALTER COLUMN isheadhascoa SET NOT NULL;
comment on column act."jurnaltype".isheadhascoa is '';


-- =============================================
-- FIELD: isheadhasunit boolean
-- =============================================
-- ADD isheadhasunit
alter table act."jurnaltype" add isheadhasunit boolean not null default false;
comment on column act."jurnaltype".isheadhasunit is '';

-- MODIFY isheadhasunit
alter table act."jurnaltype"
	alter column isheadhasunit type boolean,
	ALTER COLUMN isheadhasunit SET DEFAULT false,
	ALTER COLUMN isheadhasunit SET NOT NULL;
comment on column act."jurnaltype".isheadhasunit is '';


-- =============================================
-- FIELD: isheadhassite boolean
-- =============================================
-- ADD isheadhassite
alter table act."jurnaltype" add isheadhassite boolean not null default false;
comment on column act."jurnaltype".isheadhassite is '';

-- MODIFY isheadhassite
alter table act."jurnaltype"
	alter column isheadhassite type boolean,
	ALTER COLUMN isheadhassite SET DEFAULT false,
	ALTER COLUMN isheadhassite SET NOT NULL;
comment on column act."jurnaltype".isheadhassite is '';


-- =============================================
-- FIELD: isheadhasdept boolean
-- =============================================
-- ADD isheadhasdept
alter table act."jurnaltype" add isheadhasdept boolean not null default false;
comment on column act."jurnaltype".isheadhasdept is '';

-- MODIFY isheadhasdept
alter table act."jurnaltype"
	alter column isheadhasdept type boolean,
	ALTER COLUMN isheadhasdept SET DEFAULT false,
	ALTER COLUMN isheadhasdept SET NOT NULL;
comment on column act."jurnaltype".isheadhasdept is '';


-- =============================================
-- FIELD: isheadhaspartner boolean
-- =============================================
-- ADD isheadhaspartner
alter table act."jurnaltype" add isheadhaspartner boolean not null default false;
comment on column act."jurnaltype".isheadhaspartner is '';

-- MODIFY isheadhaspartner
alter table act."jurnaltype"
	alter column isheadhaspartner type boolean,
	ALTER COLUMN isheadhaspartner SET DEFAULT false,
	ALTER COLUMN isheadhaspartner SET NOT NULL;
comment on column act."jurnaltype".isheadhaspartner is '';


-- =============================================
-- FIELD: isheadhasproject boolean
-- =============================================
-- ADD isheadhasproject
alter table act."jurnaltype" add isheadhasproject boolean not null default false;
comment on column act."jurnaltype".isheadhasproject is '';

-- MODIFY isheadhasproject
alter table act."jurnaltype"
	alter column isheadhasproject type boolean,
	ALTER COLUMN isheadhasproject SET DEFAULT false,
	ALTER COLUMN isheadhasproject SET NOT NULL;
comment on column act."jurnaltype".isheadhasproject is '';


-- =============================================
-- FIELD: isheadhaspaymtype boolean
-- =============================================
-- ADD isheadhaspaymtype
alter table act."jurnaltype" add isheadhaspaymtype boolean not null default false;
comment on column act."jurnaltype".isheadhaspaymtype is '';

-- MODIFY isheadhaspaymtype
alter table act."jurnaltype"
	alter column isheadhaspaymtype type boolean,
	ALTER COLUMN isheadhaspaymtype SET DEFAULT false,
	ALTER COLUMN isheadhaspaymtype SET NOT NULL;
comment on column act."jurnaltype".isheadhaspaymtype is '';


-- =============================================
-- FIELD: isheadhaspaymreq boolean
-- =============================================
-- ADD isheadhaspaymreq
alter table act."jurnaltype" add isheadhaspaymreq boolean not null default false;
comment on column act."jurnaltype".isheadhaspaymreq is '';

-- MODIFY isheadhaspaymreq
alter table act."jurnaltype"
	alter column isheadhaspaymreq type boolean,
	ALTER COLUMN isheadhaspaymreq SET DEFAULT false,
	ALTER COLUMN isheadhaspaymreq SET NOT NULL;
comment on column act."jurnaltype".isheadhaspaymreq is '';


-- =============================================
-- FIELD: isheadunitmandatory boolean
-- =============================================
-- ADD isheadunitmandatory
alter table act."jurnaltype" add isheadunitmandatory boolean not null default false;
comment on column act."jurnaltype".isheadunitmandatory is '';

-- MODIFY isheadunitmandatory
alter table act."jurnaltype"
	alter column isheadunitmandatory type boolean,
	ALTER COLUMN isheadunitmandatory SET DEFAULT false,
	ALTER COLUMN isheadunitmandatory SET NOT NULL;
comment on column act."jurnaltype".isheadunitmandatory is '';


-- =============================================
-- FIELD: isheadsitemandatory boolean
-- =============================================
-- ADD isheadsitemandatory
alter table act."jurnaltype" add isheadsitemandatory boolean not null default false;
comment on column act."jurnaltype".isheadsitemandatory is '';

-- MODIFY isheadsitemandatory
alter table act."jurnaltype"
	alter column isheadsitemandatory type boolean,
	ALTER COLUMN isheadsitemandatory SET DEFAULT false,
	ALTER COLUMN isheadsitemandatory SET NOT NULL;
comment on column act."jurnaltype".isheadsitemandatory is '';


-- =============================================
-- FIELD: isheaddeptmandatory boolean
-- =============================================
-- ADD isheaddeptmandatory
alter table act."jurnaltype" add isheaddeptmandatory boolean not null default false;
comment on column act."jurnaltype".isheaddeptmandatory is '';

-- MODIFY isheaddeptmandatory
alter table act."jurnaltype"
	alter column isheaddeptmandatory type boolean,
	ALTER COLUMN isheaddeptmandatory SET DEFAULT false,
	ALTER COLUMN isheaddeptmandatory SET NOT NULL;
comment on column act."jurnaltype".isheaddeptmandatory is '';


-- =============================================
-- FIELD: isheadprojectmandatory boolean
-- =============================================
-- ADD isheadprojectmandatory
alter table act."jurnaltype" add isheadprojectmandatory boolean not null default false;
comment on column act."jurnaltype".isheadprojectmandatory is '';

-- MODIFY isheadprojectmandatory
alter table act."jurnaltype"
	alter column isheadprojectmandatory type boolean,
	ALTER COLUMN isheadprojectmandatory SET DEFAULT false,
	ALTER COLUMN isheadprojectmandatory SET NOT NULL;
comment on column act."jurnaltype".isheadprojectmandatory is '';


-- =============================================
-- FIELD: isdetilhasunit boolean
-- =============================================
-- ADD isdetilhasunit
alter table act."jurnaltype" add isdetilhasunit boolean not null default false;
comment on column act."jurnaltype".isdetilhasunit is '';

-- MODIFY isdetilhasunit
alter table act."jurnaltype"
	alter column isdetilhasunit type boolean,
	ALTER COLUMN isdetilhasunit SET DEFAULT false,
	ALTER COLUMN isdetilhasunit SET NOT NULL;
comment on column act."jurnaltype".isdetilhasunit is '';


-- =============================================
-- FIELD: isdetilhassite boolean
-- =============================================
-- ADD isdetilhassite
alter table act."jurnaltype" add isdetilhassite boolean not null default false;
comment on column act."jurnaltype".isdetilhassite is '';

-- MODIFY isdetilhassite
alter table act."jurnaltype"
	alter column isdetilhassite type boolean,
	ALTER COLUMN isdetilhassite SET DEFAULT false,
	ALTER COLUMN isdetilhassite SET NOT NULL;
comment on column act."jurnaltype".isdetilhassite is '';


-- =============================================
-- FIELD: isdetilhasdept boolean
-- =============================================
-- ADD isdetilhasdept
alter table act."jurnaltype" add isdetilhasdept boolean not null default false;
comment on column act."jurnaltype".isdetilhasdept is '';

-- MODIFY isdetilhasdept
alter table act."jurnaltype"
	alter column isdetilhasdept type boolean,
	ALTER COLUMN isdetilhasdept SET DEFAULT false,
	ALTER COLUMN isdetilhasdept SET NOT NULL;
comment on column act."jurnaltype".isdetilhasdept is '';


-- =============================================
-- FIELD: isdetilhaspartner boolean
-- =============================================
-- ADD isdetilhaspartner
alter table act."jurnaltype" add isdetilhaspartner boolean not null default false;
comment on column act."jurnaltype".isdetilhaspartner is '';

-- MODIFY isdetilhaspartner
alter table act."jurnaltype"
	alter column isdetilhaspartner type boolean,
	ALTER COLUMN isdetilhaspartner SET DEFAULT false,
	ALTER COLUMN isdetilhaspartner SET NOT NULL;
comment on column act."jurnaltype".isdetilhaspartner is '';


-- =============================================
-- FIELD: isdetilhasproject boolean
-- =============================================
-- ADD isdetilhasproject
alter table act."jurnaltype" add isdetilhasproject boolean not null default false;
comment on column act."jurnaltype".isdetilhasproject is '';

-- MODIFY isdetilhasproject
alter table act."jurnaltype"
	alter column isdetilhasproject type boolean,
	ALTER COLUMN isdetilhasproject SET DEFAULT false,
	ALTER COLUMN isdetilhasproject SET NOT NULL;
comment on column act."jurnaltype".isdetilhasproject is '';


-- =============================================
-- FIELD: isdetilallowselectunit boolean
-- =============================================
-- ADD isdetilallowselectunit
alter table act."jurnaltype" add isdetilallowselectunit boolean not null default false;
comment on column act."jurnaltype".isdetilallowselectunit is '';

-- MODIFY isdetilallowselectunit
alter table act."jurnaltype"
	alter column isdetilallowselectunit type boolean,
	ALTER COLUMN isdetilallowselectunit SET DEFAULT false,
	ALTER COLUMN isdetilallowselectunit SET NOT NULL;
comment on column act."jurnaltype".isdetilallowselectunit is '';


-- =============================================
-- FIELD: isdetilallowselectsite boolean
-- =============================================
-- ADD isdetilallowselectsite
alter table act."jurnaltype" add isdetilallowselectsite boolean not null default false;
comment on column act."jurnaltype".isdetilallowselectsite is '';

-- MODIFY isdetilallowselectsite
alter table act."jurnaltype"
	alter column isdetilallowselectsite type boolean,
	ALTER COLUMN isdetilallowselectsite SET DEFAULT false,
	ALTER COLUMN isdetilallowselectsite SET NOT NULL;
comment on column act."jurnaltype".isdetilallowselectsite is '';


-- =============================================
-- FIELD: isdetilallowselectdept boolean
-- =============================================
-- ADD isdetilallowselectdept
alter table act."jurnaltype" add isdetilallowselectdept boolean not null default false;
comment on column act."jurnaltype".isdetilallowselectdept is '';

-- MODIFY isdetilallowselectdept
alter table act."jurnaltype"
	alter column isdetilallowselectdept type boolean,
	ALTER COLUMN isdetilallowselectdept SET DEFAULT false,
	ALTER COLUMN isdetilallowselectdept SET NOT NULL;
comment on column act."jurnaltype".isdetilallowselectdept is '';


-- =============================================
-- FIELD: isdetilallowselectpartner boolean
-- =============================================
-- ADD isdetilallowselectpartner
alter table act."jurnaltype" add isdetilallowselectpartner boolean not null default false;
comment on column act."jurnaltype".isdetilallowselectpartner is '';

-- MODIFY isdetilallowselectpartner
alter table act."jurnaltype"
	alter column isdetilallowselectpartner type boolean,
	ALTER COLUMN isdetilallowselectpartner SET DEFAULT false,
	ALTER COLUMN isdetilallowselectpartner SET NOT NULL;
comment on column act."jurnaltype".isdetilallowselectpartner is '';


-- =============================================
-- FIELD: isdetilallowselectproject boolean
-- =============================================
-- ADD isdetilallowselectproject
alter table act."jurnaltype" add isdetilallowselectproject boolean not null default false;
comment on column act."jurnaltype".isdetilallowselectproject is '';

-- MODIFY isdetilallowselectproject
alter table act."jurnaltype"
	alter column isdetilallowselectproject type boolean,
	ALTER COLUMN isdetilallowselectproject SET DEFAULT false,
	ALTER COLUMN isdetilallowselectproject SET NOT NULL;
comment on column act."jurnaltype".isdetilallowselectproject is '';


-- =============================================
-- FIELD: isdetilallowgetap boolean
-- =============================================
-- ADD isdetilallowgetap
alter table act."jurnaltype" add isdetilallowgetap boolean not null default false;
comment on column act."jurnaltype".isdetilallowgetap is '';

-- MODIFY isdetilallowgetap
alter table act."jurnaltype"
	alter column isdetilallowgetap type boolean,
	ALTER COLUMN isdetilallowgetap SET DEFAULT false,
	ALTER COLUMN isdetilallowgetap SET NOT NULL;
comment on column act."jurnaltype".isdetilallowgetap is '';


-- =============================================
-- FIELD: isdetilallowgetar boolean
-- =============================================
-- ADD isdetilallowgetar
alter table act."jurnaltype" add isdetilallowgetar boolean not null default false;
comment on column act."jurnaltype".isdetilallowgetar is '';

-- MODIFY isdetilallowgetar
alter table act."jurnaltype"
	alter column isdetilallowgetar type boolean,
	ALTER COLUMN isdetilallowgetar SET DEFAULT false,
	ALTER COLUMN isdetilallowgetar SET NOT NULL;
comment on column act."jurnaltype".isdetilallowgetar is '';


-- =============================================
-- FIELD: _createby integer
-- =============================================
-- ADD _createby
alter table act."jurnaltype" add _createby integer not null ;
comment on column act."jurnaltype"._createby is 'user yang pertama kali membuat record ini';

-- MODIFY _createby
alter table act."jurnaltype"
	alter column _createby type integer,
	ALTER COLUMN _createby DROP DEFAULT,
	ALTER COLUMN _createby SET NOT NULL;
comment on column act."jurnaltype"._createby is 'user yang pertama kali membuat record ini';


-- =============================================
-- FIELD: _createdate timestamp with time zone
-- =============================================
-- ADD _createdate
alter table act."jurnaltype" add _createdate timestamp with time zone not null default now();
comment on column act."jurnaltype"._createdate is 'waktu record dibuat pertama kali';

-- MODIFY _createdate
alter table act."jurnaltype"
	alter column _createdate type timestamp with time zone,
	ALTER COLUMN _createdate SET DEFAULT now(),
	ALTER COLUMN _createdate SET NOT NULL;
comment on column act."jurnaltype"._createdate is 'waktu record dibuat pertama kali';


-- =============================================
-- FIELD: _modifyby integer
-- =============================================
-- ADD _modifyby
alter table act."jurnaltype" add _modifyby integer  ;
comment on column act."jurnaltype"._modifyby is 'user yang terakhir modifikasi record ini';

-- MODIFY _modifyby
alter table act."jurnaltype"
	alter column _modifyby type integer,
	ALTER COLUMN _modifyby DROP DEFAULT,
	ALTER COLUMN _modifyby DROP NOT NULL;
comment on column act."jurnaltype"._modifyby is 'user yang terakhir modifikasi record ini';


-- =============================================
-- FIELD: _modifydate timestamp with time zone
-- =============================================
-- ADD _modifydate
alter table act."jurnaltype" add _modifydate timestamp with time zone  ;
comment on column act."jurnaltype"._modifydate is 'waktu terakhir record dimodifikasi';

-- MODIFY _modifydate
alter table act."jurnaltype"
	alter column _modifydate type timestamp with time zone,
	ALTER COLUMN _modifydate DROP DEFAULT,
	ALTER COLUMN _modifydate DROP NOT NULL;
comment on column act."jurnaltype"._modifydate is 'waktu terakhir record dimodifikasi';




-- =============================================
-- FOREIGN KEY CONSTRAINT
-- =============================================
-- Add Foreign Key Constraint  	


-- =============================================
-- UNIQUE INDEX
-- =============================================
-- Drop existing unique index 
alter table act."jurnaltype"
	drop constraint uq$act$jurnaltype$jurnaltype_name;
	

-- Add unique index 
alter table  act."jurnaltype"
	add constraint uq$act$jurnaltype$jurnaltype_name unique (jurnaltype_name); 

