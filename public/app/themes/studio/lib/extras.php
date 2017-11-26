<?php
/**
 * Extra functions
 */

define('DENVER_TIME', '0 hours');

function unitDateFilter($string, $is_short = true) {
	$parts = explode('T', $string);
	$date = @$parts[0];
	$return = '';

	if ($date) {
		$date = DateTime::createFromFormat('Y-m-d H:i:s', $date . ' 00:00:00');
		$return = $is_short ? $date->modify( DENVER_TIME )->format('m-d-Y') : $date->modify( DENVER_TIME )->format('m-d-Y H:i:s');
	}

	return $return;
}

function getFutureDate($date1, $date2) {
	$u_date1 = DateTime::createFromFormat('m-d-Y H:i:s', $date1);
	$time1 = $u_date1->format('d-m-Y H:i:s');
	$date1_return = $u_date1->format('m-d-Y');
	$time1 = strtotime($time1);

	$time_now = strtotime( date('d-m-Y H:i:s') );

	if ( $time1 > $time_now ) {
		if ( $date2 ) {
			$u_date2 = DateTime::createFromFormat('m-d-Y', $date2);
			$time2 = $u_date2->format('d-m-Y');
			$time2 = strtotime($time2);

			return $time1 > $time2 ? $date1_return : $date2;
		} else {
			return $date1_return;
		}
	}

	return $date2 ? $date2 : '';
}

function isDate1GreaterThanDate2($date1, $date2, $include_now = false) {
	$parts = explode('T', $date2);

	$date_obj = DateTime::createFromFormat('m-d-Y', $date1);
	$date1 = strtotime( $date_obj->format('d-m-Y') );

	$date_obj = DateTime::createFromFormat('Y-m-d H:i:s', $parts[0] . ' 00:00:00');
	$denver_date = $date_obj->modify( DENVER_TIME )->format('d-m-Y');
	$date2 = strtotime( $denver_date );

	if ($include_now) {
		return $date1 >= $date2;
	} else {
		return $date1 > $date2;
	}
}