/* ************************************************************************

   Copyright:
     2010 OETIKER+PARTNER AG, Tobi Oetiker, http://www.oetiker.ch

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tobi Oetiker (oetiker)

************************************************************************ */

/**
 * A qooxdoo wrapper for the dygraphs JavsScript Visualization Library.
 * The wrapper assumes to find a copy of dygraph-combined.js
 * in the resource/qxdygraph directory. See the <a href="http://dygraphs.com/"
 * target="_blank">dygraph</a> website
 * for further information.
 *
 * Note that dygraph likes its data best coming in a csv file, you can also supplay an array of arrays where the first
 * element is an object with a getTime function that returns the number of ms since 1970 (like the Date object does).
 *
 * <pre class='javascript'>
 * var data = [];
 * for (var i=1;i<100;i++){
 *     data.push([new Date(1000000000+i*3600*1000),Math.random(),Math.sin(i/50)]);
 * }
 * var options = {
 *    labels: [ 'Date', 'Random','Sin' ]
 * };
 * var plot = new qxdygraphs.Plot(data,options);
 * </pre>
 */

/**
 * @ignore(Dygraph)
 * @external(dygraphs/dygraph-combined.js)
 */

qx.Class.define("qxdygraphs.Plot", {
    extend : qx.ui.core.Widget,

    /**
     * @param data {Any} a csv file requestable via XHR, a csv file in string format, an array pointer or a GViz object.
     * @param options {Map} the option map.
     */

    construct: function(data,options){
        this.base(arguments);
        this.__addCanvas(data,options);
    },
    statics : {
        DEFAULT_OPTIONS: {
            // thanks to http://ui.openoffice.org/VisualDesign/OOoChart_colors_drafts.html
            colors:  [
                '#005796', '#46b535', '#e93f80', '#bbe3ff',
                '#ff811b', '#007333', '#ffe370', '#a6004f', '#a6004f',
                '#bde734', '#0094d8', '#ffbedd', '#ffbf17'
            ],
            axisLabelFontSize: 12,
            labelsDivStyles: {
                fontSize: 13,
                textAlign: 'right'
            },
            labelsDivWidth: 230
        }
    },
    events : {
        /**
         * returns the plot object
         */
        plotCreated: 'qx.event.type.Event',
    },
    members : {
        __useExCanvas: false,
        getPlotObject: function(){
            return this.__plotObject;
        },
        /**
         * our copy of the plot object
         */
        __plotObject: null,
        /**
         * Create the canvas once everything is renderad
         *
         * @lint ignoreUndefined(Dygraph)
         */
        __addCanvas: function(data,options){
            this.addListenerOnce('appear',function(){
                var el = this.getContentElement().getDomElement();
                qx.bom.element.Style.setStyles(
                    el,
                    qx.theme.manager.Font.getInstance().resolve('default').getStyles(),
                    true
                );
                qx.lang.Object.mergeWith(
                    options,qxdygraphs.Plot.DEFAULT_OPTIONS,false);
                var plot = this.__plotObject = new Dygraph(el,data,options);
                this.addListener('resize',function(e){
                    qx.html.Element.flush();
                    plot.resize();
                });
                this.fireDataEvent('plotCreated', plot);
            },this);
        }
    }
});
