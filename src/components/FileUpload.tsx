import { Button } from "@mui/material";
import { LoadIcon } from "../icons";

export const FileUpload = ({
  onFileChange,
  uploadedFile,
}: {
  uploadedFile: File | null;
  onFileChange: (file: File) => void;
}) => {
  const changeHandler = (event: any) => {
    onFileChange(event.target.files[0]);
  };

  return (
    <div>
      <label htmlFor="contained-button-file">
        <Button
          className="gap-4"
          variant="outlined"
          component="span"
          fullWidth
          disableRipple
        >
          {uploadedFile ? (
            <span
              style={{
                color: "#000",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {uploadedFile.name}
            </span>
          ) : (
            <span style={{ color: "inherit" }}>Choose XLSX File</span>
          )}
          <LoadIcon />
        </Button>
        <input
          accept=".xlsx"
          id="contained-button-file"
          type="file"
          hidden
          onChange={changeHandler}
        />
      </label>
    </div>
  );
};
