from channel import Channel



class Channel_registry:
    """ this class implements the Singleton pattern. """

# ---------------------------- INSTANTIATION LOGIC ---------------------------

    __instance = None
    
   
    @staticmethod 
    def getInstance():
      """ Static access method. """
      if Channel_registry.__instance == None:
         Channel_registry()
      return Channel_registry.__instance
    
    def __init__(self):
      """ Virtually private constructor. """
      if Channel_registry.__instance != None:
         raise Exception("This class is a singleton!")
      else:
         Channel_registry.__instance = self
         self.__channels = []



    # --------------------------------- FUNCTIONS --------------------------------

    def is_channel_name_taken(self, channel_name):
        """Checks if given channel name is taken"""
        channels_list = (chan.channel_name.lower() for chan in self.__channels)
        if channel_name.lower() in channels_list:
            return True

        return False

    def get_response_for_channel_creation_request(self, channel_name):    
        if (self.is_channel_name_taken(channel_name)):
            return 'CHANNEL_NAME_TAKEN'
    
        return 'SUCCESS'

    def add_new_channel_to_channels_list(self, data):
        new_channel = Channel(data["newChannelName"], 
                              data["display_name_of_creator"])
        self.__channels.append(new_channel)

    def get_channel_list(self):
        return self.__channels

    def is_channel_list_empty(self):
        return len(self.__channels) == 0

    #def get_channel_from(self, channel_name):
    #    """gets the channel with the given name from the channels list"""
    #    channels_with_given_name = [c for c in channels if c.channel_name == 
    #                                channel_name]
    #    if channels_with_given_name.count != 1:
    #        print(channels_with_given_name.count)
    #        raise RuntimeError("No or more than one channel found with this name")
    
    #    return channels_with_given_name[0]




    # ------------------------ !!!FOR TESTING ONLY!!! ------------------------

    def clear_channel_list(self):
        """ for testing only!!! """
        self.__channels.clear()

    def setup_channels_list_with(self, new_list):
        self.clear_channel_list()
        self.__channels.extend(new_list)