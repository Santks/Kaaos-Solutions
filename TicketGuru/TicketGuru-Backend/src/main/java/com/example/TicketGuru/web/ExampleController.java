package com.example.TicketGuru.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ExampleController {

	//Tämän luokan voi poistaa kun alamme tekemään koodia oikeasti
	@GetMapping("/demo")
	public String example(Model model) {
		model.addAttribute("test", "dynamic message from controller");
		return "demo";
	}

}
