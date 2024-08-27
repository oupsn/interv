package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"github.com/gofiber/fiber/v2"
)

type CodingInterviewHandler struct {
	codingInterviewService services.ICodingInterviewService
}

func NewCodingInterviewHandler(codingInterviewService services.ICodingInterviewService) CodingInterviewHandler {
	return CodingInterviewHandler{
		codingInterviewService: codingInterviewService,
	}
}

// @Summary Submit and compile code for a coding interview
// @Description Submit and compile code for a coding interview
// @Tags Coding Interview
// @Accept json
// @Produce json
// @Param body body CodingInterviewCompileQuery true "Request body containing the code to be compiled"
// @Success 200 {object} CodingInterviewCompileResponse "Successful response with the compile result"
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /coding-interview/compile [post]
func (co CodingInterviewHandler) SubmitCompileCode(c *fiber.Ctx) error {
	var req CodingInterviewCompileQuery
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	res, err := co.codingInterviewService.CompileCode(req.Body)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return Ok(c, CodingInterviewCompileResponse{
		CompileResult: res,
	})

}
