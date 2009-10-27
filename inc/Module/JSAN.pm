#line 1
package Module::JSAN;

use warnings;
use strict;

our $VERSION = '0.01';


sub import {
    
    {
        package main;
        
        use warnings;
        use inc::Module::Build::Functions(build_class => 'Module::Build::JSAN::Installable');
        
        Module::Build::Functions::copy_package('Module::JSAN');
        Module::Build::Functions::copy_package('Module::Build::JSAN::Installable', 'true');
        
        Module::Build::Functions::_mb_required('0.35');
        
        my $old_get_builder = \&Module::Build::Functions::get_builder;
        
        no warnings;
        
        *Module::Build::Functions::get_builder = sub {
            *Module::Build::Functions::build_requires = sub {};
            *Module::Build::Functions::configure_requires = sub {};
            
            return &$old_get_builder();
        }
    }
}


__PACKAGE__;

__END__

#line 48


#line 415
