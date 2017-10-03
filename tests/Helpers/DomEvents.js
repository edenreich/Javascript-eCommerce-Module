

class DomEvents
{
	static dispatch(event) {
		switch(event) {
			case 'DOMContentLoaded':
				let DOMContentLoaded_event = document.createEvent("Event");
				DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true);
				window.document.dispatchEvent(DOMContentLoaded_event);
				break;
		}
		
	}

}

export default DomEvents;