#line 1
package Module::JSAN::DSL;

use strict;
use vars qw{$VERSION @ISA};

BEGIN {
	$VERSION = '0.001_010';
	
	require Module::Build::Functions::DSL;
	
	@ISA = 'Module::Build::Functions::DSL';
	
	*inc::Module::JSAN::DSL::VERSION = *VERSION;
	@inc::Module::JSAN::DSL::ISA     = __PACKAGE__;
}


sub get_header_code {
    
    # Load inc::Module::JSAN as we would in a regular Makefile.Pl    
    return <<END_OF_CODE;
package main;

use inc::Module::JSAN;
END_OF_CODE
        
}

__PACKAGE__;

__END__

#line 100
