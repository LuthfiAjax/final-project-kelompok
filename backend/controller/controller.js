class AppointmentController {
  // Dependency
  // AppointmentController -> AppointmentService
  constructor(appointmentService) {
    this.svc = appointmentService;
  }
  // this.svc.addAppointment.then(() => {]}).catch()
  addAppointment = async (req, res, next) => {
    try {
      await this.svc.addAppointment(req.body, req.user);
      res.status(201).json({
        status: "success",
      });
    } catch (err) {
      console.error(`[AppointmentController] [addAppointment] err=${err}`);
      res.status(err.statusCode).json({
        error: err.message,
      });
    }
  };

  getAppointment = async (req, res, next) => {
    try {
      const { page, pageSize } = req.query;
      const data = await this.svc.getAppointments(page, pageSize);
      res.send({
        data: data,
      });
    } catch (err) {
      console.error(`[AppointmentController] [getAppointment] err=${err}`);

      if (err instanceof TypeError) {
        // Handle specific TypeError here
        res.status(500).json({
          error: "Internal Server Error",
        });
      } else {
        // Handle other errors
        res.status(err.statusCode || 500).json({
          error: err.message,
        });
      }
    }
  };

  updateAppointment = async (req, res, next) => {
    try {
      const id = req.params.id;

      await this.svc.updateAppointmentsByID(id, req.body);
      res.send({
        status: "success",
      });
    } catch (error) {
      console.error(`[AppointmentController] [updateAppointment] err=${error.message}`);
      res.status(error.statusCode || 500).json({
        error: error.message,
      });
    }
  };

  deleteAppointment = async (req, res, next) => {
    try {
      const id = req.params.id;

      await this.svc.deleteAppointmentsByID(id);
      res.status(202).json({
        status: "success",
      });
    } catch (error) {
      console.error(`[AppointmentController] [deleteAppointment] err=${error}`);
      res.status(err.statusCode).json({
        error: err.message,
      });
    }
  };

  uploadAppointmentEvidence = async (req, res, next) => {
    try {
      const { id } = req.params;
      const imageURL = await this.svc.uploadAppointmentEvidence(req, id);
      res.status(200).json({
        imageURL,
      });
    } catch (error) {
      console.error(`[AppointmentController] [uploadAppointmentEvidence] err=${error}`);

      if (error.statusCode) {
        // Jika error memiliki properti statusCode, gunakan itu untuk status HTTP
        res.status(error.statusCode).json({
          error: error.message,
        });
      } else if (error.name === "ValidationError") {
        // Handle validation errors separately
        res.status(400).json({
          error: "Validation Error",
          details: error.details,
        });
      } else {
        // Untuk jenis kesalahan lainnya, berikan respons generik
        res.status(500).json({
          error: "Internal Server Error",
        });
      }
    }
  };
}

export default AppointmentController;
