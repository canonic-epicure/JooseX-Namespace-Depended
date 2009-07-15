use Module::Build::JSAN::Installable;

my $build = Module::Build::JSAN::Installable->new(
	module_name    => 'JooseX.Namespace.Depended',
	create_makefile_pl => 'passthrough',
	dist_version   => 0.01,
	dist_author   => 'SamuraiJack',
	dist_abstract  => 'Dependencies handling implementation, integrated with Joose3',
	license        => 'perl',
);

$build->create_build_script;

