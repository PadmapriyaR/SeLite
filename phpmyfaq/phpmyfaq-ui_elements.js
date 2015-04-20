/*
 *   Copyright 2015 Peter Kehl
* This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/.*/
"use strict";

(function() {
    phpMyFAQ.uiMap= new UIMap();
    
    phpMyFAQ.uiMap.addPageset({
        name: 'allPages',
        description: 'all phpMyFAQ pages',
        pathRegexp: '.*'
    });
    phpMyFAQ.uiMap.addElement('allPages', {
       name: 'loggedInAs' ,
       description: 'Span with name of the currently logged user',
       locator: "//a[ @class='dropdown-toggle' ]//span[ contains(@title, 'Logged in as') ]"
    });
    
    phpMyFAQ.uiMap.addPageset({
        name: 'nonAdminPages',
        description: 'Non-admin phpMyFAQ pages',
        pathRegexp: '(?!admin/).*'
    });
    phpMyFAQ.uiMap.addElement('nonAdminPages', {
        name: 'mobileMenuButton',
        description: 'button for the Bootstrap menu in mobile mode.',
        locator: "//button/span[ .='Toggle navigation' ]/.."
    } );
    phpMyFAQ.uiMap.addElement('nonAdminPages', {
        name: 'firstNavBar',
        description: '<ul> for the first navbar (containing Categories, Instant Response etc.).',
        locator: "//ul[ contains(@class, 'navbar-nav') and  position()=1 ]",
        testcase1: {
            xhtml:
            '<ul class="nav navbar-nav" expected-result="1">(The first navbar - Categories)\n\
             </ul>\
             <ul class="nav navbar-nav navbar-right">(The second navbar)\n\
             </ul>'
        }
    });
    phpMyFAQ.uiMap.pagesets.nonAdminPages.uiElements.firstNavBar.test();//@TODO remove once https://code.google.com/p/selenium/issues/detail?id=8429 gets fixed
    phpMyFAQ.uiMap.addElement('nonAdminPages', {
        name: 'categories',
        description: '<li> for Top menu > Categories',
        locator: Object.keys(phpMyFAQ.uiMap.pagesets.nonAdminPages.uiElements.firstNavBar.defaultLocators)[0]+ "/li[ position()=1 ]/a",
        testcase1: {
            xhtml:
            '<ul class="nav navbar-nav">\
                <li class="dropdown">\n\
                    <a expected-result="1">Categories...</a>\n\\n\
                </li>\
             </ul>\n\
             some other elements\
             <ul class="nav navbar-nav navbar-right">\n\
                <li class="dropdown">Categories here...</li>\n\
             </ul>'
        }
    });
    phpMyFAQ.uiMap.pagesets.nonAdminPages.uiElements.categories.test();//@TODO remove once https://code.google.com/p/selenium/issues/detail?id=8429 gets fixed
    phpMyFAQ.uiMap.addElement('nonAdminPages', {
        name: 'allCategories',
        description: '<li> for Top menu > Categories > All categories',
        locator: Object.keys(phpMyFAQ.uiMap.pagesets.nonAdminPages.uiElements.categories.defaultLocators)[0]+ "/../ul/li/a[ not( contains(@href, '&cat=') ) ]"
    } );
    phpMyFAQ.uiMap.addElement('nonAdminPages', {
        name: 'category',
        description: '<li> for Top menu > Categories > Xyz',
        args: [
            {name: 'name',
             description: 'Category name',
             defaultValues: []
            },
            {name: 'id',
             description: 'Category ID',
             defaultValues: []
            }
        ],
        getLocator: function(args) {
            // @TODO Use SeLiteMisc.fail() instead. However, Selenium IDE 2.9.0 doesn't show such errors nicely - TODO report that to Se HQ.
            args.name===undefined || args.id===undefined || SeLiteMisc.log().error( "Don't specify both 'name' and 'id' of a category." );
            args.name!==undefined || args.id!==undefined || SeLiteMisc.log().error( "Specify one of 'name' or 'id' of a category." );
            return Object.keys(phpMyFAQ.uiMap.pagesets.nonAdminPages.uiElements.categories.defaultLocators)[0]+ "/../ul/li/a[ "+
                (args.name!==undefined
                 ? ".=" +args.name.quoteForXPath()
                 : "contains( @href, 'cat=" +args.id+ "' )"
                )+ " ]";
        }
    } );
    phpMyFAQ.uiMap.addElement( 'nonAdminPages', {
       name: 'instantResponse',
       description: 'Top menu > Instant Response',
       locator: Object.keys(phpMyFAQ.uiMap.pagesets.nonAdminPages.uiElements.firstNavBar.defaultLocators)[0]+ "/li[ position()=2 ]/a"
    });
    phpMyFAQ.uiMap.addElement( 'nonAdminPages', {
       name: 'addNewFAQ',
       description: 'Top menu > Add new FAQ',
       locator: Object.keys(phpMyFAQ.uiMap.pagesets.nonAdminPages.uiElements.firstNavBar.defaultLocators)[0]+ "/li[ position()=3 ]/a"
    });
    phpMyFAQ.uiMap.addElement( 'nonAdminPages', {
       name: 'addQuestion',
       description: 'Top menu > Add question',
       locator: Object.keys(phpMyFAQ.uiMap.pagesets.nonAdminPages.uiElements.firstNavBar.defaultLocators)[0]+ "/li[ position()=4 ]/a"
    });
    phpMyFAQ.uiMap.addElement( 'nonAdminPages', {
       name: 'openQuestions',
       description: 'Top menu > Open questions',
       locator: Object.keys(phpMyFAQ.uiMap.pagesets.nonAdminPages.uiElements.firstNavBar.defaultLocators)[0]+ "/li[ position()=5 ]/a"
    });
    phpMyFAQ.uiMap.addElement('nonAdminPages', {
        name: 'currentUserDropdown',
        description: '<li> with menu for the currently logged in user (if any).',
        locator: "//ul[ contains(@class, 'navbar-nav') and  position()=2 ]/li[ contains(@class, 'dropdown') ]",
        testcase1: {
            xhtml:
            '<ul class="nav navbar-nav">(The first navbar - Categories etc.)\n\
             </ul>\
             <ul class="nav navbar-nav navbar-right">\n\
                <li class="dropdown" expected-result="1">User-name-here...</li>\n\
             </ul>'
        }
    });
    // the following is for development, so that when Bootstrap re-loads this file automatically, it re-runs the test.
    phpMyFAQ.uiMap.pagesets.nonAdminPages.uiElements.currentUserDropdown.test();//@TODO remove once https://code.google.com/p/selenium/issues/detail?id=8429 gets fixed
    
    phpMyFAQ.uiMap.addPageset({
        name: 'adminPages',
        description: 'Admin pages of  phpMyFAQ',
        pathRegexp: 'admin/'
    });
    phpMyFAQ.uiMap.addElement('adminPages', {
        name: 'currentUserDropdown',
        description: '<li> with menu for the currently logged in admin user; only for pages under "admin/".',
        locator: '//a[ @class="dropdown-toggle" ]//b[ contains(@class, "fa-user") ]/following-sibling::span/../..',
        testcase1: {
            xhtml:
            '<li class="dropdown" expected-result="1">\
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">\
                    <b class="fa fa-user"></b>\
                    <span title="Logged in as louise">\
                        Louise                    </span>\
                    <b class="fa fa-caret-down"></b>\
                </a>\
                <ul class="dropdown-menu">\
                    <li>\
                        <a href="index.php?action=passwd">\
                            <i class="fa fa-lock"></i> Change Password                        </a>\
                    </li>\
                    <li class="divider"></li>\
                    <li>\
                        <a href="index.php?action=logout">\
                            <i class="fa fa-power-off"></i> Logout                        </a>\
                    </li>\
                </ul>\
            </li>'
        }
    });
    phpMyFAQ.uiMap.pagesets.adminPages.uiElements.currentUserDropdown.test();//@TODO remove once https://code.google.com/p/selenium/issues/detail?id=8429 gets fixed
    
    /** @return {string} Locator of current user dropdown, depending on current URL. It works for both admin and non-admin pages. The only menu item under this dropdown common on both types of pages is Logout link, so this serves to locate it in a uniform way.
     * */
    phpMyFAQ.currentUserDropdownLocator= function currentUserDropdownLocator() {
        return SeLiteSettings.appPath().startsWith( '/admin/' )
            ? 'ui=adminPages::currentUserDropdown()'
            : 'ui=nonAdminPages::currentUserDropdown()';
    };
    
    /** Beware: Admin navigation menu shrinks on mobile/small screen.
     *  object {
     *    string sectionName: object {
     *        topLevel: string URL,
     *        secondLevel: object {
     *          string itemName: string URL,
     *          ...
     *        }
     *    },
     *    ...
     * }
     * */
    var adminNavigation= {
        Dashboard: {
            topLevel: 'index.php',
            secondLevel: {}
        },
        Users: {
            topLevel: 'index.php?action=user',
            secondLevel: {
                'Users': '?action=user',
                'Change Password': '?action=passwd'
            }
        },
        Content: {
            topLevel: 'index.php?action=content',
            secondLevel: {
                'FAQ Categories': '?action=category',
                'Add new FAQ': '?action=editentry',
                'Edit existing FAQs': '?action=view',
                'Search for FAQs': '?action=searchfaqs',
                'Comments': '?action=comments',
                'Open questions': '?action=question',
                'FAQ Glossary': '?action=glossary',
                'FAQ News': '?action=news',
                'FAQ Attachments': '?action=attachments',
                'Tags': '?action=tags'
            }
        },
        Statistics: {
            topLevel: 'index.php?action=statistics',
            secondLevel: {
                'Rating Statistics': '?action=statistics',
                'View Sessions': '?action=viewsessions',
                'View Adminlog': '?action=adminlog',
                'Search Statistics': '?action=searchstats',
                'Reports': '?action=reports'
            }
        },
        Exports: {
            topLevel: 'index.php?action=export',
            secondLevel: {}
        },
        Backup: {
            topLevel: 'index.php?action=backup',
            secondLevel: {}
        },
        Configuration: {
            topLevel: 'index.php?action=config',
            secondLevel: {
                'Edit configuration': '?action=config',
                'System Information': '?action=system',
                'FAQ Multi-sites': '?action=instances',
                'Stop Words': '?action=stopwordsconfig',
                'Interface Translation': '?action=translist'
            }
        }
    };
    /** Assumptions:
     *  - top level items have URLs starting with 'index.php'
     *  - second level items have URLs starting with '?action='
     *  */
    phpMyFAQ.uiMap.addElement('adminPages', {
        name: 'topNavigation',
        description: 'Link to top level navigation entry.',
        getLocator: function(args) {
            // I could set a 'local variable', as per chrome://selenium-ide/content/selenium-core/scripts/ui-doc.html > UI-Element Shorthand > _*, but it could make this less clear
            return '//ul[ @id="side-menu" ]/li/a[ @href="' +adminNavigation[ args.section ].topLevel+ '" ]';
        },
        args: [
            {
                name: 'section',
                description: 'Name of the section',
                required: true,
                defaultValues: Object.keys( adminNavigation )
            }
        ],
        testcase1: {
            args: { section: 'Users' },
            xhtml:
            '<ul class="nav" id="side-menu">\
                <li class="sidebar-userinfo">\
                    <div class="userpanel">\
                        <small>Logged in as </small><br/>\
                        Pete                    </div>\
                </li>\
                <li class="active">\
                    <a href="index.php">\
                        <i class="fa fa-dashboard fa-fw"></i> Dashboard                    </a>\
                </li>\
                <li>\
                    <a href="index.php?action=user" expected-result="1">\
                        <i class="fa fa-users"></i> Users                        <span class="fa arrow"></span></a>\
                    \
                    <ul class="nav nav-second-level collapse ">\
                        <li><a href="?action=category">FAQ Categories</a></li>\
<li><a href="?action=editentry">Add new FAQ record</a></li>\
<li><a href="?action=view">Edit existing FAQs</a></li>\
<li><a href="?action=question">Open questions</a></li>\
<li><a href="?action=system">System Information</a></li>\
                    </ul>\
                </li>\
                <li>\
                    <a href="index.php?action=content">\
                        <i class="fa fa-edit fa-fw"></i> Content                        <span class="fa arrow"></span></a>\
                    \
                    <ul class="nav nav-second-level collapse ">\
                        <li><a href="?action=category">FAQ Categories</a></li>\
<li><a href="?action=editentry">Add new FAQ record</a></li>\
<li><a href="?action=view">Edit existing FAQs</a></li>\
<li><a href="?action=question">Open questions</a></li>\
<li><a href="?action=system">System Information</a></li>\
                    </ul>\
                </li>\
                <li>\
                    <a href="index.php?action=statistics">\
                        <i class="fa fa-tasks fa-fw"></i> Statistics                        <span class="fa arrow"></span></a>\
                    \
                    <ul class="nav nav-second-level collapse ">\
                        <li><a href="?action=category">FAQ Categories</a></li>\
<li><a href="?action=editentry">Add new FAQ record</a></li>\
<li><a href="?action=view">Edit existing FAQs</a></li>\
<li><a href="?action=question">Open questions</a></li>\
<li><a href="?action=system">System Information</a></li>\
                    </ul>\
                </li>\
                <li>\
                    <a href="index.php?action=export">\
                        <i class="fa fa-book fa-fw"></i> Exports                    </a>\
                </li>\
                <li>\
                    <a href="index.php?action=backup">\
                        <i class="fa fa-download fa-fw"></i> Backup                    </a>\
                    <ul class="nav nav-second-level collapse">\
                        <li><a href="?action=category">FAQ Categories</a></li>\
<li><a href="?action=editentry">Add new FAQ record</a></li>\
<li><a href="?action=view">Edit existing FAQs</a></li>\
<li><a href="?action=question">Open questions</a></li>\
<li><a href="?action=system">System Information</a></li>\
                    </ul>\
                </li>\
                <li>\
                    <a href="index.php?action=config">\
                        <i class="fa fa-wrench fa-fw"></i> Configuration                        <span class="fa arrow"></span></a>\
                    \
                    <ul class="nav nav-second-level collapse ">\
                        <li><a href="?action=category">FAQ Categories</a></li>\
<li><a href="?action=editentry">Add new FAQ record</a></li>\
<li><a href="?action=view">Edit existing FAQs</a></li>\
<li><a href="?action=question">Open questions</a></li>\
<li><a href="?action=system">System Information</a></li>\
                    </ul>\
                </li>\
\
                <li class="sidebar-adminlog">\
                    <div>\
                        <b class="fa fa-info-circle fa-fw"></b> Admin worklog<br/>\
                        <span id="saving_data_indicator"></span>\
                    </div>\
                </li>\
                <li class="sidebar-sessioninfo">\
                    <div>\
                        <b class="fa fa-clock-o fa-fw"></b> Session expires in:\
                        <span id="sessioncounter">00:29:14</span>\
                    </div>\
                </li>\
            </ul>'
        }
    });
    phpMyFAQ.uiMap.pagesets.adminPages.uiElements.topNavigation.test();//@TODO remove once https://code.google.com/p/selenium/issues/detail?id=8429 gets fixed
    
    phpMyFAQ.uiMap.addElement('adminPages', {
        name: 'secondNavigation',
        description: 'Link to second level navigation entry.',
        getLocator: function(args) {
            return '//ul[ @id="side-menu" ]/li/a[ @href="' +adminNavigation[ args.section ].topLevel+ '" ]/following-sibling::ul/li/a[ @href="' +adminNavigation[ args.section ].secondLevel[ args.item ]+ '" ]';
        },
        args: [
            {
                name: 'section',
                description: 'Name of the section',
                required: true,
                defaultValues: Object.keys( adminNavigation )
            },
            {
                name: 'item',
                description: 'Name of the second level item',
                required: true,
                defaultValues: SeLiteMisc.collectFromDepth( SeLiteMisc.collectByColumnFromDeep(adminNavigation, ['secondLevel'], 1), 1, undefined, true )
            }
        ],
        testcase1: {
            args: { section: 'Users', item:'Change Password' },
            xhtml: '<ul class="nav" id="side-menu">\
                <li class="sidebar-userinfo">\
                    <div class="userpanel">\
                        <small>Logged in as </small><br/>\
                        Pete                    </div>\
                </li>\
                <li>\
                    <a href="index.php">\
                        <i class="fa fa-dashboard fa-fw"></i> Dashboard                    </a>\
                </li>\
                <li class="active">\
                    <a href="index.php?action=user">\
                        <i class="fa fa-users"></i> Users                        <span class="fa arrow"></span></a>\
                    \
                    <ul class="nav nav-second-level collapse in">\
                        <li class="active"><a href="?action=user">Users</a></li>\
<li><a href="?action=passwd" expected-result="1">Change Password</a></li>\
                    </ul>\
                </li>\
                <li>\
                    <a href="index.php?action=content">\
                        <i class="fa fa-edit fa-fw"></i> Content                        <span class="fa arrow"></span></a>\
                    \
                    <ul class="nav nav-second-level collapse ">\
                        <li class="active"><a href="?action=user">Users</a></li>\
<li><a href="?action=passwd">Change Password</a></li>\
                    </ul>\
                </li>\
                <li>\
                    <a href="index.php?action=statistics">\
                        <i class="fa fa-tasks fa-fw"></i> Statistics                        <span class="fa arrow"></span></a>\
                    \
                    <ul class="nav nav-second-level collapse ">\
                        <li class="active"><a href="?action=user">Users</a></li>\
<li><a href="?action=passwd">Change Password</a></li>\
                    </ul>\
                </li>\
                <li>\
                    <a href="index.php?action=export">\
                        <i class="fa fa-book fa-fw"></i> Exports                    </a>\
                </li>\
                <li>\
                    <a href="index.php?action=backup">\
                        <i class="fa fa-download fa-fw"></i> Backup                    </a>\
                    <ul class="nav nav-second-level collapse">\
                        <li class="active"><a href="?action=user">Users</a></li>\
<li><a href="?action=passwd">Change Password</a></li>\
                    </ul>\
                </li>\
1                <li>\
                    <a href="index.php?action=config">\
                        <i class="fa fa-wrench fa-fw"></i> Configuration                        <span class="fa arrow"></span></a>\
                    \
                    <ul class="nav nav-second-level collapse ">\
                        <li class="active"><a href="?action=user">Users</a></li>\
<li><a href="?action=passwd">Change Password</a></li>\
                    </ul>\
                </li>\
\
                <li class="sidebar-adminlog">\
                    <div>\
                        <b class="fa fa-info-circle fa-fw"></b> Admin worklog<br/>\
                        <span id="saving_data_indicator"></span>\
                    </div>\
                </li>\
                <li class="sidebar-sessioninfo">\
                    <div>\
                        <b class="fa fa-clock-o fa-fw"></b> Session expires in:\
                        <span id="sessioncounter">00:29:41</span>\
                    </div>\
                </li>\
            </ul>'
        }
    });
    phpMyFAQ.uiMap.pagesets.adminPages.uiElements.secondNavigation.test();//@TODO remove once https://code.google.com/p/selenium/issues/detail?id=8429 gets fixed
})();