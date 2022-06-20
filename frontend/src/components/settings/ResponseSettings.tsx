import { useUpdateResponseConfig } from "@/hooks/settings";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useUssd } from "../../context/UssdContext";
import { TextConstants } from "../../utils/Constants";
import ValueEditor from "./Editor";

const ResponseSettings = () => {
  const { responseConfig } = useUssd();
  const { status, error, mutate } = useUpdateResponseConfig();
  const { enqueueSnackbar } = useSnackbar();

  const onSave = (value: string, type: string, extra: any) => {
    console.log({ value, type, extra });
    mutate({
      responseType: type,
      responseSample: value,
      ...extra,
    });
  };

  useEffect(() => {
    if (status === "success") {
      enqueueSnackbar("saved");
    } else if (status === "error") {
      console.log(error);
      enqueueSnackbar(TextConstants.FailedToSave, {
        variant: "error",
      });
    }
  }, [status, error, enqueueSnackbar]);

  return (
    <div>
      <ValueEditor
        type={responseConfig.responseType}
        value={responseConfig.responseSample}
        onSave={onSave}
        savedKeys={{
          responseSessionTypeKey: responseConfig.responseSessionTypeKey,
          responseMessageKey: responseConfig.responseMessageKey,
        }}
      />
    </div>
  );
};

export default ResponseSettings;
