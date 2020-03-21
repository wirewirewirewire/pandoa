import React, { useEffect, useRef } from "react";
import BottomSheetDetails from "./BottomSheetDetail";
import { connect } from "react-redux";
import BottomSheetSingle from "./BottomSheetSingle";
import { getDetail } from "../../selectors";

function BottomSheet({ detail }) {
  const bottomSheetRef = useRef(null);
  const bottomSheetInnerRef = useRef(null);

  useEffect(() => {
    console.log("bottomSheetRef", bottomSheetRef);
    if (detail !== false) {
      bottomSheetRef.current.snapTo(0);
      bottomSheetInnerRef.current.snapTo(2);
    } else {
      bottomSheetRef.current.snapTo(2);
      bottomSheetInnerRef.current.snapTo(0);
    }
  }, [detail]);

  return (
    <>
      <BottomSheetDetails bottomSheetRef={bottomSheetRef} />
      <BottomSheetSingle detail={detail} bottomSheetRef={bottomSheetInnerRef} />
    </>
  );
}

const mapStateToProps = state => {
  return {
    detail: getDetail(state)
  };
};

export default connect(mapStateToProps)(BottomSheet);
