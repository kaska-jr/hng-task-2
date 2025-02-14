import React, { useContext, useEffect } from "react";
import Separator from "./../../../components/shared/ui/Separator";
import { Input } from "./../../../components/shared/ui/Input";
import Button from "./../../../components/shared/ui/Button";
import { MdOutlineMail } from "react-icons/md";
import StageContext from "../../../context/StageContext";
import { uploadFile } from "../../../lib/uploadFile";
import TicketDetailsContext from "../../../context/DetailsContext";
import { useFormik } from "formik";
import { basicSchema } from "../../../schema";

const AttendeeDetails = () => {
  const { gotoNext, goToPrevious } = useContext(StageContext);
  const {
    ticketDetails,
    setTicketDetails,
    setTicketHolderList,
    ticketHolderList,
  } = useContext(TicketDetailsContext);
  const [uploadingImage, setUploadingImage] = React.useState(false);

  const handleUpload = async (file) => {
    setUploadingImage(true);
    try {
      const response = await uploadFile(file);
      if (response?.secure_url) {
        setTicketDetails({
          ...ticketDetails,
          profileImage: response.secure_url,
          originalFileName: response.original_filename,
          fileExt: response.format,
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (_, actions) => {
    const payload = {
      name: values.name,
      email: values.email,
      specialRequest: values.specialRequest,
      profileImage: ticketDetails.profileImage,
      ticketNumber: ticketDetails.ticketNumber,
      ticketType: ticketDetails.ticketType,
    };
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (!Array.isArray(ticketHolderList) || ticketHolderList.length === 0) {
      setTicketHolderList([payload]);
      gotoNext();
    } else {
      setTicketHolderList([...ticketHolderList, payload]);
      gotoNext();
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: ticketDetails?.email || "",
      name: ticketDetails?.name || "",
      specialRequest: ticketDetails?.specialRequest || "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  useEffect(() => {
    setTicketDetails((prev) => ({ ...prev, ...values }));
  }, [values]);

  return (
    <article className="ticket-attendee">
      <div className="attendee-upload">
        <h1>Upload Profile Photo</h1>
        <div className="attendee-upload-wrapper">
          <div className="attendee-upload-image">
            {uploadingImage ? (
              <span class="loader"></span>
            ) : (
              <>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="image-input"
                  accept="image/jpg, image/jpeg, image/png, image/*"
                  aria-label="Upload images"
                  onChange={(e) => handleUpload(e.target.files[0])}
                />
                <img src="/upload-icon.svg" alt="upload icon" />
                <span style={{ color: "white" }}>
                  Drag & drop or click to upload
                </span>
              </>
            )}
          </div>
        </div>
        {ticketDetails.profileImage && (
          <p className="uploaded">
            Uploaded:{" "}
            <span
              style={{ color: "green" }}
            >{`${ticketDetails.originalFileName}.${ticketDetails.fileExt}`}</span>
          </p>
        )}
      </div>
      <Separator />

      <form
        action=""
        className="attendee-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="attendee-detail attendee-name">
          <label htmlFor="name">Enter your Full Name</label>
          <Input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.name && touched.name
                ? "input-error input-fix"
                : "input-fix"
            }
          />
          {errors.name && touched.name && (
            <p className="error">{errors.name}</p>
          )}
        </div>
        <div className="attendee-detail attendee-email">
          <label htmlFor="email">
            Enter your Email <span>*</span>
          </label>
          <div className="input-with-icon">
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? "input-error" : ""}
            />
            <MdOutlineMail className="input-icon" />
          </div>
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>

        <div className="attendee-detail attendee-phone">
          <label htmlFor="specialRequest">Special Request?</label>
          <textarea
            name="specialRequest"
            value={values.specialRequest}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.specialRequest && touched.specialRequest
                ? "input-error"
                : ""
            }
            id="specialRequest"
            rows={"50"}
          ></textarea>
          {errors.specialRequest && touched.specialRequest && (
            <p className="error">{errors.specialRequest}</p>
          )}
        </div>
        <div className="button-wrapper">
          <Button
            outline={true}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            Back
          </Button>
          <Button type="submit">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </article>
  );
};

export default AttendeeDetails;
