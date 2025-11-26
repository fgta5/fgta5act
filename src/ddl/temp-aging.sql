
CREATE TABLE temp.aging (
	cache_id uuid not null,
	seq int2 not null,
	rowid int4 not null,
	expired timestamp,

	block int2,


	jurnal_id int8,
	jurnaldetil_id int8,
	jurnaldetil_descr text,
	jurnal_date date,
	jurnal_datedue date,
	jurnal_due int2,

	partner_id int4,
	partner_name text,
	coa_id int4,
	coa_name text,
	unit_id int4,
	unit_name text,
	site_id int4,
	site_name text,
	dept_id int4,
	dept_name text,
	project_id int4,
	project_name text,
	curr_id int2,
	curr_code text,

	outstanding_value decimal(18,2),
	value_due_000 decimal(18,2),
	value_due_030 decimal(18,2),
	value_due_060 decimal(18,2),
	value_due_090 decimal(18,2),
	value_due_120 decimal(18,2),
	value_due_999 decimal(18,2),

	outstanding_idr decimal(18,2),
	idr_due_000 decimal(18,2),
	idr_due_030 decimal(18,2),
	idr_due_060 decimal(18,2),
	idr_due_090 decimal(18,2),
	idr_due_120 decimal(18,2),
	idr_due_999 decimal(18,2),

	PRIMARY key (cache_id, rowid)
);




