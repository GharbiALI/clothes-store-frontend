import styled from "styled-components";
import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5 MB

interface ClotheFormFields {
  name: string;
  brand: string;
  size: Size;
  colorHex: string;
  photo: File | null;
}

const initialFields: ClotheFormFields = {
  name: "",
  brand: "",
  size: "M",
  colorHex: "#2563eb",
  photo: null,
};

const isTextValid = (text: string): boolean => {
  return text.trim().length >= 2;
};

export const ClothForm = () => {
  const [fields, setFields] = useState<ClotheFormFields>(initialFields);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFields((prev) => ({ ...prev, [id]: value }));
  };

    const handleSizeChange = (size: Size) => {
      setFields((prev) => ({ ...prev, size }));
    };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_PHOTO_SIZE) {
      setPhotoError("Photo must be under 5 MB");
      e.target.value = "";
      return;
    }

    setPhotoError(null);
    setFields((prev) => ({ ...prev, photo: file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  const sendInformation = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
  };
  return (
    <StyledForm action="#" method="post" onSubmit={sendInformation}>
      <InputGroup>
        <Label htmlFor="name">Name </Label>
        <Input
          type="text"
          id="name"
          value={fields.name}
          onChange={handleChange}
          placeholder="e.g. Robe"
          $hasValue={fields.name !== ""}
          $isValid={isTextValid(fields.name)}
        />
        {!isTextValid(fields.name) && fields.name !== "" && (
          <ErrorText>name must be at least 2 characters</ErrorText>
        )}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="brand">Brand </Label>
        <Input
          type="text"
          id="brand"
          value={fields.brand}
          onChange={handleChange}
          placeholder="e.g. RobeEnSoucre"
          $hasValue={fields.brand !== ""}
          $isValid={isTextValid(fields.brand)}
        />
        {!isTextValid(fields.brand) && fields.brand !== "" && (
          <ErrorText>Brand must be at least 2 characters</ErrorText>
        )}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="colorHex">Color</Label>
        <ColorPickerContainer>
          <ColorInput
            type="color"
            id="colorHex"
            value={fields.colorHex}
            onChange={handleChange}
          />
          <ColorHexText>{fields.colorHex}</ColorHexText>
        </ColorPickerContainer>
      </InputGroup>
      <InputGroup>
        <GroupTitle>Size</GroupTitle>
        <SizeGroup>
          {SIZES.map((size) => (
            <SizeOption key={size}>
              <SizeRadio
                type="radio"
                id={`cloth-size-${size}`}
                name="size"
                value={size}
                checked={fields.size === size}
                onChange={() => handleSizeChange(size)}
              />
              <SizeLabel
                htmlFor={`cloth-size-${size}`}
                $isSelected={fields.size === size}
              >
                {size}
              </SizeLabel>
            </SizeOption>
          ))}
        </SizeGroup>
      </InputGroup>

      <InputGroup>
        <GroupTitle>Photo</GroupTitle>
        <UploadContainer $hasImage={!!previewUrl}>
          <HiddenFileInput
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          {previewUrl ? (
            <PreviewWrapper>
              <PreviewImage src={previewUrl} alt="Upload preview" />
              <ChangePhotoText>Click to change photo</ChangePhotoText>
            </PreviewWrapper>
          ) : (
            <>
              <UploadIcon>
                <ImagePlus size={28} strokeWidth={1.8} />
              </UploadIcon>
              <UploadText>Choose a photo</UploadText>
              <UploadSubtext>JPG or PNG, up to 5 MB</UploadSubtext>
            </>
          )}
        </UploadContainer>
        {photoError && <ErrorText>{photoError}</ErrorText>}
      </InputGroup>
      <ButtonGroup>
        <SubmitButton type="submit">Add clothes</SubmitButton>

        <CancelButton onClick={()=>console.log("fields : ", fields)}>Cancel</CancelButton>
      </ButtonGroup>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 12px;
`;

const Label = styled.label`
  margin-bottom: 6px;

  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
`;

interface InputProps {
  $hasValue: boolean;
  $isValid: boolean;
}

const Input = styled.input<InputProps>`
  padding: 9px 12px;

  background-color: #f8fafc;
  color: #0f172a;
  font-size: 14px;

  border: ${(props) =>
    props.$hasValue && !props.$isValid
      ? "2px solid #ef4444"
      : "1px solid #2563eb"};
  border-radius: 8px;

  outline: none;

  &:focus {
    border-width: 2px;
  }
`;

const ErrorText = styled.p`
  margin: 4px 0 0 0;

  font-size: 12px;
  color: #ef4444;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  margin-top: 12px;
`;

const ColorPickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 6px 10px;

  background-color: #f8fafc;
  border: 1px solid #2563eb;
  border-radius: 8px;
`;
const GroupTitle = styled.span`
  margin-bottom: 6px;

  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
`;
const SizeOption = styled.div`
  position: relative;
  flex: 1;
  min-width: 55px;
`;

const SizeRadio = styled.input`
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;
  margin: 0;

  opacity: 0;
  cursor: pointer;
`;

interface SizeLabelProps {
  $isSelected: boolean;
}
const SizeLabel = styled.label<SizeLabelProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 44px;

  font-size: 15px;
  font-weight: 600;
  color: ${({ $isSelected }) => ($isSelected ? "#1d4ed8" : "#1e293b")};
  background: ${({ $isSelected }) => ($isSelected ? "#eff6ff" : "#ffffff")};

  border: 1px solid
    ${({ $isSelected }) => ($isSelected ? "#1d4ed8" : "#e2e8f0")};
  border-radius: 10px;

`;

const ColorInput = styled.input`
  width: 38px;
  height: 38px;

  background: none;
  border: none;
  border-radius: 6px;

  cursor: pointer;
`;

const ColorHexText = styled.span`
  font-size: 14px;
  color: #0f172a;
`;

const SizeGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const UploadContainer = styled.label<{ $hasImage: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: ${({ $hasImage }) => ($hasImage ? "12px" : "24px")};

  background-color: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;

  cursor: pointer;
  transition:
    border-color 0.15s,
    background-color 0.15s;

  &:hover {
    border-color: #2563eb;
    background-color: #f1f5f9;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  width: 100%;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 160px;

  object-fit: cover;
  border-radius: 8px;
`;

const ChangePhotoText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
`;
const UploadIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 8px;

  color: #64748b;
`;

const UploadText = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
`;

const UploadSubtext = styled.span`
  margin-top: 4px;

  font-size: 13px;
  color: #64748b;
`;
const SubmitButton = styled.button`
  flex: 1;

  padding: 11px;

  background-color: #2563eb;
  color: #ffffff;

  border: none;
  border-radius: 8px;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  flex: 1;

  padding: 11px;

  background-color: #f1f5f9;
  color: #475569;

  border: 1px solid #cbd5e1;
  border-radius: 8px;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    background-color: #e2e8f0;
  }
`;
