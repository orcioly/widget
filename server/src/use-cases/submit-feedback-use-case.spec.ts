import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able o submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,afasdfasd",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able o submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64,afasdfasd",
      })
    ).rejects.toThrow();
  });

  it("should not be able o submit a feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUT",
        comment: "",
        screenshot: "data:image/png;base64,afasdfasd",
      })
    ).rejects.toThrow();
  });

  it("should not be able o submit a feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUT",
        comment: "ta tudo bugado",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
