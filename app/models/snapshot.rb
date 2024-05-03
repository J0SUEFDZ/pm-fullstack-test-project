require 'mail'

class Snapshot < ApplicationRecord
  serialize :data, coder: JSON

  def self.take
    connection = Postmark::ApiClient.new(Rails.application.config.x.postmark.api_token)

    # See usage docs at https://github.com/wildbit/postmark-gem
    data = connection.get_messages()

    nodes = Set.new
    links = Set.new
    topics = {}

    data.each do |message|
      from = extract_address(message[:from])
      # It doesn't seem like it can have more that one recipient given the API response
      # but I included this just in case, for the future :wink:
      to = all_recipients(message[:to])
      subject = message[:subject]

      nodes.add({id: from})
      to.each do |recipient|
        # Add the recipient as a node too, since the graph needs to have all the nodes
        nodes.add({id: recipient})

        # Add the link between the sender and the recipient
        links.add({source: from, target: recipient})

        topics[from] ||= {}
        old_topic = topics[from][recipient]
        # This takes a conversation (if exists), and adds the new topic to the conversation
        # Same as N recipients, didn't found a conversation between the same two people from the API
        # So, in this case `old_topic` will be nil, but I added a safeguard just in case
        topics[from][recipient] = [old_topic, subject].compact.join(", ")
      end
    end

    puts "Added #{nodes.size} nodes and #{links.size} links to the snapshot."
    Snapshot.new(data: {nodes: nodes, links: links, topics: topics})
  end

  def self.all_recipients(recipients)
    recipients.map{ |recipient| recipient["Name"]}
  end

  def self.extract_address(address_string)
    Mail::Address.new(address_string).display_name
  end
end
