/* ************************************************************************
   Copyright: Public Domain
************************************************************************ */

qx.Class.define("qxdygraphs.demo.Application", {
    extend : qx.application.Standalone,
    members : {
    main : function() {
        this.base(arguments);
        if (qx.core.Variant.isSet("qx.debug", "on")){
            // support native logging capabilities, e.g. Firebug for Firefox
            qx.log.appender.Native;
            // support additional cross-browser console. Press F7 to toggle visibility
            qx.log.appender.Console;
        };
        var data = [];
        for (var i=1;i<10000;i++){
            data.push([new Date((1000000000+i*360)*1000),Math.random(),Math.sin(i/1000)]);
        }

        var options = {
            lables: [ 'Random','Sin' ]
        };

        var plotDemo = [{
            title: 'CSV String Input',
            data: 'Date,Value\n2008-05-23,578.55\n2008-06-08,566.5\n2008-07-25,480.88\n2008-08-22,509.84\n'
                 +'2008-09-26,454.13\n2008-10-24,379.75\n2008-11-08,303\n2008-12-26,308.56\n'
                 +'2009-01-23,299.14\n2009-02-09,346.51\n2009-03-20,325.99\n2009-04-24,386.15\n',
            options: { 
                fillGraph: true,
                labelsKMB: true                                
            }
        },{
            title: 'Array Input',
            data: data,
            options: options
        }
        ];

        for (var i=0;i<plotDemo.length;i++){
            this.makePlot(plotDemo[i].data,plotDemo[i].options,plotDemo[i].title);
        }
    },
    x: 0,
    y: 0,
    makePlot: function(data,options,title){
            var win = new qx.ui.window.Window(title);
            win.set({
                width: 600,
                height: 400,
                showMinimize: false,
                showClose: false,
                layout: new qx.ui.layout.Grow()
            });
            this.getRoot().add(win, {left:this.x+=60, top:this.y+=50});
            win.open();
            var plot = new qxdygraphs.Plot(
                data,
                options
            );
            win.add(plot);
    }
}});
