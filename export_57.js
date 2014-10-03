  /**
	   * Export data to excel file for CompletionReport Datatable (057_01 datatable)
	   * @author Quynhtnn
	   */
	function completionReportCreateExportExcel() {
	 	// Clean Alert
		showAlert(false);
    	ajaxSource = "index.php?m=057_CompletionReportCreate&c=ApiCompletionReportCreateExport&a=CompletionReportCreateGetDataExport";
        var url = getUrlWithDatatableParams('completion_report_create_table', ajaxSource, "xlsx");
        //console.log(url);
        var data_to_send = {};
        var advancedSearch = oTable.fnSettings().advancedSearch;
	    if (typeof advancedSearch !== "undefined") {
	    	data_to_send['query'] = advancedSearch["query"];
	    }
	    
	    $.fileDownload(url, {
	    	httpMethod: "POST",
	    	data: data_to_send
	    }).fail(function (result) { 
	    	//console.log(result);
	    	if(result == 'NoData'){
	    		showAlert(true, ERROR_MSG_050); 
	    	}
	    	else {
	    		showAlert(true, 'Permission required'); 
	    	}
	    });
	}
	
	   /**
	    * Export data to CSV file for CompletionReport Datatable (057_01 datatable)
	    * @author tnnQuynh
	    */
	function completionReportCreateExportCsv() {
		// Clean Alert
		showAlert(false);
    	ajaxSource = "index.php?m=057_CompletionReportCreate&c=ApiCompletionReportCreateExport&a=CompletionReportCreateGetDataExport";
        var url = getUrlWithDatatableParams('completion_report_create_table', ajaxSource, "csv");

        var data_to_send = {};
        var advancedSearch = oTable.fnSettings().advancedSearch;
	    if (typeof advancedSearch !== "undefined") {
	    	data_to_send['query'] = advancedSearch["query"];
	    }
	    
	    $.fileDownload(url, {
	    	httpMethod: "POST",
	    	data: data_to_send
	    }).fail(function (result) { 
	    	//console.log(result);
	    	if(result == 'NoData'){
	    		showAlert(true, ERROR_MSG_050); 
	    	}
	    	else {
	    		showAlert(true, 'Permission required'); 
	    	}
	    });

	}
	
	
  /**
   * For Create Report
   * @author tnnQuynh
   */
	function createReport() {
		var cfirm = confirm(MSG_117);
		if (cfirm == true)
		{
			if(select_all==0){			
				var url = "index.php?m=057_CompletionReportCreate&c=ApiCompletionReportCreateExport&a=CompletionReportCreate";
				var uri_with_params = getUrlWithDatatableParams("completion_report_create_table",url,"none");
				//If select all check box is unchecked
				var data_to_send = {};
				data_to_send['select_all'] = 0;
				data_to_send['rows'] = array_select;
				//console.log(array_select);
				$.ajax({
					url : uri_with_params,
					type : "POST",
					async : false,
					dataType : "json",
					data : data_to_send,
					success : function(response) {
						//console.log(response);
						if (response.status == '200') {
							
							oTable.fnDraw();
							array_select = {};
							select_all = 0;
							number_select = 0;
							remove_select = {};
							showSuccessMsg(MSG_042);
						}else{
							showAlert(true, response.message);
						}
					}
				});
			}else{
				//console.log(remove_select);
				var url = "index.php?m=057_CompletionReportCreate&c=ApiCompletionReportCreateExport&a=CompletionReportCreate";
				var uri_with_params = getUrlWithDatatableParams("completion_report_create_table",url,"none");
				// If select all checkbox is checked
				var data_to_send = {};
				data_to_send['select_all'] = 1;
				data_to_send['rows'] = remove_select;
				$.ajax({
					url : uri_with_params,
					type : "POST",
					async : false,
					dataType : "json",
					data : data_to_send,
					success : function(response) {
						//console.log(response);
						if (response.status == '200') {
							alert(response.url);
							oTable.fnDraw();
							array_select = {};
							select_all = 0;
							number_select = 0;
							remove_select = {};
							showSuccessMsg(MSG_042);
						}else{
							showAlert(true, response.message);
						}
					}
				});
			}
		}
	}
	
	function getUrlWithDatatableParams(tableId, ajaxsource, type) {
	    //ref: http://datatables.net/extras/tabletools/plug-ins#download
	    //"TableTools.s.dt" 
	    //(the variables used to say: TableTools . settings . datatable) 
	    //to get the DataTables settings object. 
	    var table_tools = TableTools.fnGetInstance(tableId);
	    var oParams = table_tools.s.dt.oApi._fnAjaxParameters(table_tools.s.dt);
	    var num_rows = table_tools.s.dt['_iRecordsDisplay'];
	    var url = ajaxsource + "&type=" + type;
	    $.each(oParams, function(key, value) {
	        if(value['name'] === 'iDisplayLength'){
	            value['value'] = num_rows;
	        }else if(value['name'] === 'iDisplayStart'){
	            value['value'] = 0;
	        }
	        if (value['name'].indexOf('mDataProp') === -1 && value['name'].indexOf('bRegex') === -1
	                && value['name'].indexOf('bSortable') === -1) {
	            url += "&" + value['name'] + "=" + value['value'];
	        }
	    });
	    return url;
	}
	