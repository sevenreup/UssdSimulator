import { useSnackbar } from "notistack";
import { useUssd } from "../../context/UssdContext";
import { TextConstants } from "../../utils/Constants";
import ValueEditor from "./Editor";

const RequestSettings = () => {
  const { data, setAppData } = useUssd();
  const { enqueueSnackbar } = useSnackbar();
  const onSave = async (value: string, type: string, extra: any) => {
    console.log({ value, type, extra });
    try {
      await setAppData?.({
        requestType: type,
        requestSample: value,
        ...extra,
      });
      enqueueSnackbar("saved");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(TextConstants.FailedToSave, {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <ValueEditor
        type={data.requestType}
        value={data.requestSample}
        onSave={onSave}
        savedKeys={{
          requestMessageKey: data.requestMessageKey,
          requestMsisdnKey: data.requestMsisdnKey,
          requestSessionKey: data.requestSessionKey,
          requestSessionTypeKey: data.requestSessionTypeKey,
        }}
      />
    </div>
  );
};

export default RequestSettings;
