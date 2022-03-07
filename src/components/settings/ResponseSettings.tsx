import { useSnackbar } from "notistack";
import { useUssd } from "../../context/UssdContext";
import { TextConstants } from "../../utils/Constants";
import ValueEditor from "./Editor";

const ResponseSettings = () => {
  const { data, setAppData } = useUssd();
  const { enqueueSnackbar } = useSnackbar();

  const onSave = (value: string, type: string, extra: any) => {
    console.log({ value, type, extra });
    try {
      setAppData?.({
        responseType: type,
        responseSample: value,
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
        type={data.responseType}
        value={data.responseSample}
        onSave={onSave}
        savedKeys={{
          responseSessionTypeKey: data.responseSessionTypeKey,
          responseMessageKey: data.responseMessageKey,
        }}
      />
    </div>
  );
};

export default ResponseSettings;
