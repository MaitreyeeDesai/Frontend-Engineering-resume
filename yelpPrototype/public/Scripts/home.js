/**
 * New node file
 */
var Blist;
$(document).ready(function() {
	$("body").delegate("#business-add-form", "submit", function(ev) {
		$.ajax({
			type : $(this).attr('method'),
			url : $(this).attr('action'),
			data : $(this).serialize(),
			success : function(data) {
				showRecievedMessage(JSON.parse(data));
			},
			error : function(data) {
				showRecievedMessage(data);

			}

		});

		ev.preventDefault();
	});

	$("body").delegate("#category-add-form", "submit", function(ev) {
		$.ajax({
			type : $(this).attr('method'),
			url : $(this).attr('action'),
			data : $(this).serialize(),
			success : function(data) {
				showRecievedMessage(JSON.parse(data));
			},
			error : function(data) {
				showRecievedMessage(JSON.parse(data));

			}
		});

		ev.preventDefault();
	});
	$("body").delegate("#category-edit-form", "submit", function(ev) {
		$.ajax({
			type : $(this).attr('method'),
			url : $(this).attr('action'),
			data : $(this).serialize(),
			success : function(data) {
				showRecievedMessage(JSON.parse(data));
			},
			error : function(data) {
				showRecievedMessage(JSON.parse(data));

			}
		});

		ev.preventDefault();
	});
	$("body").delegate("#review-form", "submit", function(ev) {
		$.ajax({
			type : $(this).attr('method'),
			url : $(this).attr('action'),
			data : $(this).serialize(),
			success : function(data) {
				showRecievedMessage(JSON.parse(data));
			},
			error : function(data) {
				showRecievedMessage(JSON.parse(data));

			}
		});

		ev.preventDefault();
	});

});

function writeReview() {
	// get the currently existing bussiness list

	$.ajax({
		dataType : "JSON",
		url : "http://localhost:3000/getBList",
		success : function(data) {
			Blist = data;
			$.ajax({
				dataType : "html",
				url : "http://localhost:3000/writeReview",
				success : function(data) {
					$(".home-page-body").html(data);
					$("#business_desc").autocomplete(
							{
								minLength : 1,
								source : Blist,
								focus : function(event, ui) {
									$("#business_desc").val(ui.item.bname);
									return false;
								},
								select : function(event, ui) {
									$("#business_desc").val(ui.item.bname);
									$("#business_id").val(ui.item.bid);
									return false;
								},
								open : function() {
									$(this).removeClass("ui-corner-all")
											.addClass("ui-corner-top");
								},
								close : function() {
									$(this).removeClass("ui-corner-top")
											.addClass("ui-corner-all");
								}
							}).autocomplete("instance")._renderItem = function(
							ul, item) {
						return $("<li>").append("<a>" + item.bname + "</a>")
								.appendTo(ul);
					}

				},
				error : function() {

				}
			});
		},
		error : function() {

		}
	});

}

function getBussinessListView() {
	$.ajax({
		dataType : "html",
		url : "http://localhost:3000/bussinessList",
		success : function(data) {
			$(".home-page-body").html(data);
		},
		error : function() {

		}
	});

}

function getWriteReviewView() {
	var current = getSelectedBusiness();
	$("#bname").text(current.bname);
	$("#address").text(current.address);
	$("#nhood").text(current.neiborhood);
	$("#review_writing_div").slideDown("slow");

}

function getSelectedBusiness() {
	var selectedBusiness = $("#business_id").val().trim();
	for (var counter = 0; counter < Blist.length; counter++) {

		var curr = Blist[counter];
		if (curr.bid == selectedBusiness) {

			return curr;
		}
	}
}

function getAddBusinessView() {
	$.ajax({
		dataType : "html",
		url : "http://localhost:3000/getAddBusinessView",
		success : function(data) {
			$(".home-page-body").html(data);
		},
		error : function() {

		}
	});
}

function showRecievedMessage(data) {
	if (data.errorCode == 101) {
		$("#error-span").text(data.message);
		$("#errorMessage").fadeIn("slow", function() {
			// Animation complete
			setTimeout(function() {
				$("#errorMessage").fadeOut("slow");
			}, 4000);
		});

	} else {
		$("#success-span").text(data.message);
		$("#successMessage").fadeIn("slow", function() {
			// Animation complete
			setTimeout(function() {
				$("#successMessage").fadeOut("slow");
			}, 4000);
		});

	}

}

function getWriteReviewViewForBusiness(bid) {
	var serverURL="http://localhost:3000/writeReviewView?bid="+bid;
	$.ajax({
		dataType : "HTML",
		url :serverURL ,
		success : function(data) {
			$(".home-page-body").html(data);
		},
		error : function() {

		}
	});
}

function getCategoryListView() {
	$.ajax({
		dataType : "html",
		url : "http://localhost:3000/getCategoryList",
		success : function(data) {
			$(".home-page-body").html(data);
		},
		error : function() {

		}
	});

}

function getAddCategoryiew() {
	$.ajax({
		dataType : "HTML",
		url : "http://localhost:3000/addCategoryView",
		success : function(data) {
			$(".home-page-body").html(data);
		},
		error : function() {

		}
	});

}

function deleteCategory(cid) {

	var serverURL = "http://localhost:3000/deleteCategory?cid=" + cid;
	$.ajax({
		dataType : "JSON",
		url : serverURL,
		success : function(data) {
			showRecievedMessage(data);
		},
		error : function(data) {
			showRecievedMessage(data.responseText);
		}
	});
}

function getEditCategoryView(cid) {

	var serverURL = "http://localhost:3000/editCategoryView?cid=" + cid;
	$.ajax({
		dataType : "HTML",
		url : serverURL,
		success : function(data) {
			$(".home-page-body").html(data);
		},
		error : function(data) {
			showRecievedMessage(data.responseText);
		}
	});
}

function getDashboard()
{
	$.ajax({
		dataType : "HTML",
		url : "http://localhost:3000/getDashboard",
		success : function(data) {
			$(".home-page-body").html(data);
		},
		error : function(data) {
			showRecievedMessage(data.responseText);
		}
	});

}