var Harness

if (typeof process != 'undefined' && process.pid) {
    require('Task/Test/Run/NodeJSBundle')
    
    Harness = Test.Run.Harness.NodeJS
} else
    Harness = Test.Run.Harness.Browser.ExtJS
    
    
Harness.my.configure({
    title       : 'JooseX.Namespace.Depended test suite',
    
    verbosity   : 1,
    runCore     : 'sequential',
    
    preload     : Joose.is_NodeJS ? [
        
        'jsan:Task.Joose.Core',
        
        'Task.JooseX.Namespace.Depended.NodeJS'
        
    ] : [
        'jsan:Task.Joose.Core',
        'jsan:JooseX.SimpleRequest',
        'jsan:JooseX.Meta.Lazy',
        
        'Task.JooseX.Namespace.Depended.Web'
        
        //,'/jsan/Digest/MD5.js',
        //'JooseX.Namespace.Depended.Grouped'
    ]
})


Harness.my.start(
    '005_resources_manager.t.js',
    '010_basic.t.js',
    '011_basic_own_url.t.js',
    '012_basic_begin.t.js',
    '015_basic_for_roles.t.js',
    '016_external_preloaded_js.t.js',
    '017_use_in_anonymous.t.js',
    '018_dependency_in_meta.t.js',
    '019_synchronous_class_creation.t.js',
    '020_stressed.t.js',
    '030_versioning.t.js',
    '040_dependencies_besides_use.t.js',
    '050_own_namespace_deps.t.js',
    '060_asynchronous_nesting.t.js',
    '070_dependencies_in_my.t.js',
    '080_dependencies_in_lazy_classes.t.js',
    '081_dependencies_in_lazy_classes.t.js',
    '082_dependencies_from_previous_namespace.t.js',
    '090_future_class.t.js',
    '100_additional_resources.t.js',
    '110_several_classes_in_file.t.js',
    '120_script_tag_transport.t.js'
)
